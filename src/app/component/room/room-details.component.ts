import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //get routes parameter
import { Router } from '@angular/router';
import { Room } from '../../model/room';
import { Activity } from '../../model/activity';
import { RoomService } from '../../service/room.service';
import { ActivityService } from '../../service/activity.service';
import { UserService } from '../../service/user.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { FollowUsersService } from '../../service/follow-users.service';
import { AuthenticationService } from '../../service/authentication.service';
import { ValidationService } from '../../service/validation.service';
import * as AppConst from '../../constant/app.const';
declare var swal: any;

import 'rxjs/add/operator/catch'; //http catch error

@Component({
  selector: 'room-details',
  templateUrl: 'room-details.component.html',
  styleUrls: ['room-details.component.css']
})
export class RoomDetailComponent implements OnInit {
  private roomid = null
  private clicked_book_now = false
  private star = 3
  private list_activity = []
  isloading = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomservice: RoomService,
    private userservice: UserService,
    private activityservice: ActivityService,
    private auth: AuthenticationService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService,
    private validationService: ValidationService) {
	
  }
  
  public ngOnInit(): void {
    this.showRoomDetails()
    this.isloading = false
  }
  
  showRoomDetails() {
	  this.roomid = this.route.snapshot.params['id']
    this.roomservice.getRoom(this.roomid).subscribe((room: Room) => {
      if (room === null) {
        this.data.resetRoom()
      } else {
        this.data.room = room
        this.calculateRating()
        this.data.addImgURLRoom()
        this.isloading = true
        this.followUserService.followUsers(AppConst.CLICK_ROOM_DETAIL + this.data.room.name)
      }
    },
      err => {
        console.log(err)
        this.data.resetRoom()
      }
    )
    this.loadFeedbackRoomData()
  }


  calculateRating() {
    this.data.room.star = this.check(this.data.room.star);
    this.data.room.numvote = this.check(this.data.room.numvote)
    if (this.data.room.numvote == 0)
      this.data.room.average_star = 0
    else
      this.data.room.average_star = this.data.room.star / this.data.room.numvote
  }

  loadFeedbackRoomData() {
    this.activityservice.getFeedbackRoomById(this.roomid).subscribe((list_activity: Activity[]) => {
      this.list_activity = list_activity
    })
  }

  check(value: any): number {
    if (value == null || typeof value == undefined || isNaN(value)) {
      return 0;
    }
    return value;
  }

  booknow() {
    if (this.auth.authenticated == false) {
      this.auth.pleaselogin()
    } else {
      this.validationService.swAlertInputToBookNow()
      this.clicked_book_now = true
    }
  }

  bookroom(checkindate: Date, checkoutdate: Date) {
    this.clicked_book_now = true;
    if (checkindate == null || checkoutdate == null || checkindate.toString() == '' || checkoutdate.toString() == '') {
      this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NOT_INPUT_CI_CO);
      this.validationService.swAlertNoCheckDate()
    } else {
      if (new Date().getTime() > new Date(checkindate).getTime()) {
        this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NOT_TODAY);
        this.validationService.swAlertBookUpToDate()
      }
      else if (checkindate > checkoutdate) {
        this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.CI_BEFORE_CI);
        this.validationService.swAlertBookOutOfDate()
      } else {
        this.computeBalance(checkindate, checkoutdate)
      }
    }
  }

  computeBalance(checkindate: Date, checkoutdate: Date) {
    var user = this.data.user;
    var moneySpent = this.data.room.price
    if (user.balance >= moneySpent) {
      user.balance = user.balance - moneySpent
      this.userservice.editUser(user).subscribe(
        responsse => {
          if (responsse) {
            this.checkBooking(checkindate, checkoutdate)
          }
        }, err => this.validationService.swAlertUsualErr(err)
      )
    } else {
      this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NO_MONEY)
      this.validationService.swAlertCannotPay()
    }
  }

  checkBooking(checkindate: Date, checkoutdate: Date) {
    let room = this.data.room
    room.status = 'booked'
    room.booked_by = this.data.user.username
    room.checkin = checkindate
    room.checkout = checkoutdate
    this.roomservice.bookRoom(room).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
          this.postActivity(checkindate, checkoutdate)
          this.followUserService.followUsers('book room ' + this.data.room.name + ' successfully');
          this.validationService.swAlertBookSuccess()
        }
      },
      err => this.validationService.swAlertUsualErr(err)
    )
  }

  postActivity(checkindate: Date, checkoutdate: Date): void {
    let activity = new Activity("Book Room", this.data.user.username, this.roomid, "Booked Room " + this.data.room.name, "Check in: " + checkindate + " & Check out: " + checkoutdate, AppConst.BOOKED + this.data.room.name + AppConst.PAYMENT + this.data.room.price, "Not Yet")
    this.activityservice.addActivity(activity).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
        }
      },
      err => this.validationService.swAlertUsualErr(err)
    )
  }

  cancelRoom() {
    swal({
      title: AppConst.CANCEL,
      text: AppConst.SURE_CANCEL,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: AppConst.ACCEPT_CANCEL,
      closeOnConfirm: true
    }
      ,
      confirmed => {
        if (confirmed) {
          this.sendCancleRequest()
        }
      }
    );
  }

  sendCancleRequest() {
    let activity = new Activity(AppConst.CANCEL, this.data.user.username, this.roomid, AppConst.CLICK_CANCEL + this.data.room.name, AppConst.NO_RES, AppConst.CLICK_CANCEL_ROOM + this.data.room.name + AppConst.CANCEL_CONT, "Not Yet")
    this.activityservice.addActivity(activity).subscribe(
      response => {
        if (response) {
          this.followUserService.followUsers('cancel room ' + this.data.room.name);
          this.router.navigate(['/profile'])
        }
      },
      err => this.validationService.swAlertUsualErr(err)
    )
  }

  rating(star: number) {
    this.star = star
  }

  sendroomfeedback(mes: string) {
    if (mes == null || mes == '') mes = 'no content'
    let activity = new Activity("Feedback Room", this.data.user.username, this.roomid, AppConst.FEEDBACK_SENT, "Rating room " + this.data.room.name + " with " + this.star + " ★", mes, "Not Yet")

    if (this.data.room.star == null) {
      this.data.room.star = this.star
      this.data.room.numvote = 1
    } else {
      this.data.room.star += this.star
      ++this.data.room.numvote
    }
    this.roomservice.feedbackRoom(this.data.room).subscribe(
      responsse => {
        if (responsse) {
          this.activityservice.addActivity(activity).subscribe(
            responsse => {
              if (responsse) {
                this.loadFeedbackRoomData()
                this.calculateRating()
                this.followUserService.followUsers(AppConst.SENT_FB_ROOM + this.data.room.name)
                this.validationService.swAlertFeedbackSent()
              }
            },
            err => console.log(err)
          );
        }
      },
      err => this.validationService.swAlertUsualErr(err)
    );
  }
}