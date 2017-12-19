import { Component } from '@angular/core';
import { Activity } from '../../model/activity';
import { AuthenticationService } from '../../service/authentication.service';
import { FollowUsersService } from '../../service/follow-users.service';
import { ActivityService } from '../../service/activity.service';
import { ValidationService } from '../../service/validation.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})

export class ContactComponent {
  constructor(
    private auth: AuthenticationService,
    private activityservice: ActivityService, 
    private followUserService: FollowUsersService,
    private validationService: ValidationService) {
    this.followUserService.followUsers(AppConst.CLICK_CONTACT)
  }

  sendContact(fullname: string, email: string, phone: string, mes: string) {
    if (fullname == '' || email == '' || phone == '' || mes == '') {
      this.validationService.swAlertNotEnoughInput()
    } else {
      let activity = new Activity(AppConst.SEND_CONTACT, AppConst.GUEST + "name: " + fullname + ", email: " + email + ", phone: " + phone, AppConst.CONTACT, AppConst.MES_SENT, AppConst.NO_RES, mes, AppConst.NOT_RES_YET)
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
