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
import * as swal from 'sweetalert';

import 'rxjs/add/operator/catch'; //http catch error

@Component({
  selector: 'room-details',
  templateUrl: 'room-details.component.html',
  styleUrls: ['room-details.component.css']
})
export class RoomDetailComponent implements OnInit {
  private room_id = null
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
    this.room_id = this.route.snapshot.params['id']
    this.roomservice.getRoom(this.room_id).subscribe((room: Room) => {
      if (room === null) {
        this.data.resetRoom();
      } else {
        this.data.room = room
        this.calculateRating()
        this.data.addImgURLRoom()
        this.followUserService.followUsers('click link /room-details: ' + this.data.room.name);
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
    this.activityservice.getFeedbackRoomById(this.room_id).subscribe((list_activity: Activity[]) => {
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
      swal('Please input check in and check out date!')
      this.clicked_book_now = true;
    }
  }

  bookroom(checkindate: Date, checkoutdate: Date) {
    this.clicked_book_now = true;
    if (checkindate == null || checkoutdate == null || checkindate.toString() == '' || checkindate.toString() == '') {
      this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: not input checkin and checkout');
      swal("Oops...", "You forgot to input check in and check out date!", "error")
    } else {
      if (new Date().getTime() > new Date(checkindate).getTime()) {
        this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: checkin date much be from today');
        swal("Oops...", "Checkin date much be from today!", "error")
      }
      else if (checkindate > checkoutdate) {
        this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: checkout date much be after checkin date');
        swal("Oops...", "Checkout date much be after checkin date!", "error")
      } else {
        this.computeBalance(checkindate, checkoutdate)
      }
    }
  }

  showErr(err: string) {
    this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: error');
    swal("Oops...", "Sorry. Something go wrong!", "error")
    console.log(err)
  }

  computeBalance(checkindate: Date, checkoutdate: Date) {
    let user = this.data.user
    let balance = user.balance
    let price = this.data.room.price
    if (balance >= price) {
      user.balance = balance - price
      this.userservice.editUser(user).subscribe(
        responsse => {
          if (responsse) {
            this.checkBooking(checkindate, checkoutdate)
          }
        }, err => this.showErr(err)
      )
    } else {
      this.followUserService.followUsers('book room ' + this.data.room.name + ' failed: account balance is not enough to pay');
      swal("Oops...", "Sorry. Your account balance is not enough to pay!", "error")
    }
  }

  checkBooking(checkindate: Date, checkoutdate: Date) {
    this.data.room.status = 'booked'
    this.data.room.booked_by = this.data.user.username
    this.data.room.checkin = checkindate
    this.data.room.checkout = checkoutdate
    this.roomservice.editRoom(this.data.room).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
          this.postActivity(checkindate, checkoutdate)
        }
      },
      err => this.showErr(err)
    );
    this.followUserService.followUsers('book room ' + this.data.room.name + ' successfully');
    swal('Congrats!', 'Booking Request sent successfully! Thank you!', 'success')
  }

  postActivity(checkindate: Date, checkoutdate: Date): void {
    let name = "Book Room"
    let username = this.data.user.username
    let click = this.room_id
    let details = "Booked Room " + this.data.room.name
    let note = "Check in: " + checkindate + " & Check out: " + checkoutdate
    let content = "You have booked room " + this.data.room.name + " and made pre-payment for one day with total $" + this.data.room.price
    let fullname = this.data.user.name
    let email = username
    let phone = this.data.user.phone
    let activity = new Activity(name, username, click, details, note, content, "Not Yet", fullname, email, phone)
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
      title: "Cancel Room!",
      text: "Are you sure cancel this room?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, cancle it!",
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
    let name = "Cancel Room"
    let username = this.data.user.username
    let click = this.room_id
    let details = "Clicked Cancel Room " + this.data.room.name
    let note = "Waiting for response!"
    let content = "You have clicked Cancel Room " + this.data.room.name + "! Please waiting for our response. If your requirement is accepted. You might still lose half of the price of this room"
    let fullname = this.data.user.name
    let email = username
    let phone = this.data.user.phone
    let activity = new Activity(name, username, click, details, note, content, "Not Yet", fullname, email, phone)
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
    let name = "Feedback Room"
    let click = this.room_id
    let username = this.data.user.username
    let details = "Feedback sent successfully!"
    let note = "Rating room " + this.data.room.name + " with " + this.star + " ★"
    if (mes == null || mes == '')
      mes = 'no content'
    let fullname = this.data.user.name
    let email = username
    let phone = this.data.user.phone
    let activity = new Activity(name, username, click, details, note, mes, "Not Yet", fullname, email, phone)

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
                this.followUserService.followUsers('send feedback for room ' + this.data.room.name)
                swal('Thanks for your feedback!', 'Your feedback is sent successfully!', 'success')
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