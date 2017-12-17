import { Component, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { Activity } from '../../model/activity';
import { ActivatedRoute } from '@angular/router'; //get routes parameter
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { ActivityService } from '../../service/activity.service';
import { UserService } from '../../service/user.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { FollowUsersService } from '../../service/follow-users.service';
import { AuthenticationService } from '../../service/authentication.service';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomservice: RoomService,
    private userservice: UserService,
    private activityservice: ActivityService,
    private auth: AuthenticationService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService) {
    this.roomid = this.route.snapshot.params['id']
    this.roomservice.getRoom(this.roomid).subscribe((room: Room) => {
      if (room === null) {
        this.data.resetRoom();
      } else {
        this.data.room = room
        this.calculateRating()
        this.data.addImgURLRoom()
        this.followUserService.followUsers(AppConst.CLICK_ROOM_DETAIL + this.data.room.name);
      }
    },
      err => {
        console.log(err)
        this.data.resetRoom();
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

  ngOnInit(): void { }

  booknow() {
    if (this.auth.authenticated == false) {
      this.auth.pleaselogin()
    } else {
      swal(AppConst.INPUT_CHECKIN_CHECKOUT)
      this.clicked_book_now = true;
    }
  }

  bookroom(checkindate: Date, checkoutdate: Date) {
    this.clicked_book_now = true;
    if (checkindate == null || checkoutdate == null || checkindate.toString() == '' || checkoutdate.toString() == '') {
      this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NOT_INPUT_CI_CO);
      swal("Oops...", AppConst.NO_CHECKIN_CHECKOUT, "error")
    } else {
      if (new Date().getTime() > new Date(checkindate).getTime()) {
        this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NOT_TODAY);
        swal("Oops...", AppConst.UP_TO_DATE, "error")
      }
      else if (checkindate > checkoutdate) {
        this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.CI_BEFORE_CI);
        swal("Oops...", AppConst.OUT_OF_DATE, "error")
      } else {
        this.computeBalance(checkindate, checkoutdate)
      }
    }
  }

  showErr(err: string) {
    this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: error');
    swal("Oops...", AppConst.ERROR, "error")
    console.log(err)
  }

  computeBalance(checkindate: Date, checkoutdate: Date) {
    if (this.data.user.balance >= this.data.room.price) {
      this.data.user.balance = this.data.user.balance - this.data.room.price
      this.userservice.editUser(this.data.user).subscribe(
        responsse => {
          if (responsse) {
            this.checkBooking(checkindate, checkoutdate)
          }
        }, err => this.showErr(err)
      )
    } else {
      this.followUserService.followUsers('book room ' + this.data.room.name + AppConst.NO_MONEY);
      swal("Oops...", AppConst.CANNOT_PAY, "error")
    }
  }

  checkBooking(checkindate: Date, checkoutdate: Date) {
    let room = this.data.room
    room.status = 'booked'
    room.booked_by = this.data.user.username
    room.checkin = checkindate
    room.checkout = checkoutdate
    this.roomservice.editRoom(room).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
          this.postActivity(checkindate, checkoutdate)
        }
      },
      err => this.showErr(err)
    );
    this.followUserService.followUsers('book room ' + this.data.room.name + ' successfully');
    swal('Congrats!', AppConst.BOOK_SUCCESS, 'success')
  }

  postActivity(checkindate: Date, checkoutdate: Date): void {
    let activity = new Activity("Book Room", this.data.user.username, this.roomid, "Booked Room " + this.data.room.name, "Check in: " + checkindate + " & Check out: " + checkoutdate, AppConst.BOOKED + this.data.room.name + AppConst.PAYMENT + this.data.room.price, "Not Yet")
    this.activityservice.addActivity(activity).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
        }
      },
      err => this.showErr(err)
    );
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
      err => this.showErr(err)
    );
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
    this.roomservice.editRoom(this.data.room).subscribe(
      responsse => {
        if (responsse) {
          this.activityservice.addActivity(activity).subscribe(
            responsse => {
              if (responsse) {
                this.loadFeedbackRoomData()
                this.calculateRating()
                this.followUserService.followUsers(AppConst.SENT_FB_ROOM + this.data.room.name)
                swal(AppConst.TKS_FB, AppConst.FB_SENT_SUCCESS, 'success')
              }
            },
            err => console.log(err)
          );
        }
      },
      err => this.showErr(err)
    );
  }
}