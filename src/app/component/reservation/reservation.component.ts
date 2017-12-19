import { Component } from '@angular/core';
import { Activity } from '../../model/activity';
import { FollowUsersService } from '../../service/follow-users.service';
import { AuthenticationService } from '../../service/authentication.service';
import { ActivityService } from '../../service/activity.service';
import { ValidationService } from '../../service/validation.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'reservation',
  templateUrl: 'reservation.component.html'
})
export class ReservationComponent {
  constructor(
    private followUserService: FollowUsersService,
    private auth: AuthenticationService,
    private activityservice: ActivityService,
    private validationService: ValidationService) { }

  submitReservation(name: string, email: string, phone: string, numRoom: number, numAdult: number, checkin: Date, checkout: Date, mes: string) {
    if (name === '' || email === '' || phone === '' || numRoom <= 0 || numAdult <= 0 || checkin.toString() == '' || checkout.toString() == '') {
      this.validationService.swAlertNotEnoughInput()
    }
    else if (new Date().getTime() > new Date(checkin).getTime()) {
      this.validationService.swAlertUsualErr(AppConst.UP_TO_DATE)
    }
    else if (checkin > checkout) {
      this.validationService.swAlertUsualErr(AppConst.OUT_OF_DATE)
    } else {
      let activity = new Activity("Reservation", AppConst.GUEST + "name: " + name + ", email: " + email + ", phone: " + phone, "reservation", AppConst.MES_SENT, AppConst.NO_RES, "No. of Rooms: " + numRoom + "\nNo. of Adults: " + numAdult + "\nCheck in: " + checkin + "\nCheck out: " + checkout + "\n" + mes, AppConst.NOT_RES_YET)
      this.activityservice.addActivity(activity).subscribe(
        responsse => {
          if (responsse) {
            this.validationService.swAlertEmailSent()
          }
        },
        err => this.validationService.swAlertUsualErr(err)
      );
    }
  }
}
