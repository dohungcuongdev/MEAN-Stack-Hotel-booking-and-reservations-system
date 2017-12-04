import { Component } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { Activity } from '../../model/activity';
import { FollowUsersService } from '../../service/follow-users.service';
import * as AppConst from '../../constant/app.const';
import * as swal from 'sweetalert';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})

export class ContactComponent {
  constructor(private activityservice: ActivityService, private followUserService: FollowUsersService) {
    this.followUserService.followUsers(AppConst.CLICK_CONTACT);
   }

  sendContact(fullname: string, email: string, phone: string, mes: string) {
    if (fullname === '' || email === '' || phone === '' || mes === '') {
      swal(AppConst.ERR_TITLE, AppConst.NOT_ENOUGH_INFOR, AppConst.ERR)
    } else {
      let name = AppConst.SEND_CONTACT
      let username = AppConst.GUEST + "name: " + fullname + ", email: " + email + ", phone: " + phone
      let click = AppConst.CONTACT
      let details = AppConst.MES_SENT
      let note = AppConst.NO_RES
      let activity = new Activity(name, username, click, details, note, mes, AppConst.NOT_RES_YET)
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
