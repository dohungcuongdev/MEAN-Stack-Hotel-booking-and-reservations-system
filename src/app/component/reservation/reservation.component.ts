import { Component } from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';
import { AuthenticationService } from '../../service/authentication.service';
import { ActivityService } from '../../service/activity.service';
import { Activity } from '../../model/activity';
import * as AppConst from '../../constant/app.const';
declare var swal: any;

@Component({
  selector: 'reservation',
  templateUrl: 'reservation.component.html'
})
export class ReservationComponent {
  constructor(private followUserService: FollowUsersService, private auth: AuthenticationService, private activityservice: ActivityService) { }

  submitReservation(name: string, email: string, phone: string, numRoom: number, numAdult: number, checkin: Date, checkout: Date, mes: string) {
    if (name === '' || email === '' || phone === '' || numRoom <= 0 || numAdult <= 0 || checkin.toString() == '' || checkout.toString() == '') {
      //swal(AppConst.ERR_TITLE, AppConst.NOT_ENOUGH_INFOR, AppConst.ERR)
    }
    else if (new Date().getTime() > new Date(checkin).getTime()) {
      swal("Oops...", AppConst.UP_TO_DATE, "error")
    }
    else if (checkin > checkout) {
      swal("Oops...", AppConst.OUT_OF_DATE, "error")
    } else {
      let activity = new Activity("Reservation", AppConst.GUEST + "name: " + name + ", email: " + email + ", phone: " + phone, "reservation", AppConst.MES_SENT, AppConst.NO_RES, "No. of Rooms: " + numRoom + "\nNo. of Adults: " + numAdult + "\nCheck in: " + checkin + "\nCheck out: " + checkout + "\n" + mes, AppConst.NOT_RES_YET)
      this.activityservice.addActivity(activity).subscribe(
        responsse => {
          if (responsse) {
            swal(AppConst.CONGRATS, AppConst.MES_SENT_SUCCESS, AppConst.SUCCESS)
          }
        },
        err => this.showErr(err)
      );
    }
  }

  showErr(err: string) {
    swal(AppConst.ERR_TITLE, AppConst.ERROR, AppConst.ERR)
    console.log(err)
  }
}
