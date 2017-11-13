import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { FollowUsersService } from '../../service/follow-users.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Activity } from '../../model/activity';
import { CookieService } from 'angular2-cookie/core';
import * as AppConst from '../../constant/app.const';
import * as swal from 'sweetalert';

@Component({
  selector: 'contact',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})
export class FeedBackComponent implements OnInit {

  private star = 3

  constructor(
    private activityservice: ActivityService,
    private auth: AuthenticationService,
    private followUserService: FollowUsersService,
    private data: InMemoryDataService,
    private cookie: CookieService
  ) { 
    this.followUserService.followUsers(AppConst.CLICK_FEED_BACK);
  }

  ngOnInit(): void {
    if (this.cookie.get("id") == null) {
      this.auth.pleaselogin()
    }
  }

  rating(star: number) {
    this.star = star
  }

  sendfeedback(mes: string) {
    let name = AppConst.FEEDBACK
    let click = AppConst.FEEDBACK
    let username = this.data.user.username
    let details = AppConst.FEEDBACK_SENT
    let note = AppConst.RATING + this.star + AppConst.STAR
    if (mes == null || mes == '')
      mes = AppConst.NO_CONT
    let fullname = this.data.user.name
    let email = username
    let phone = this.data.user.phone
    let activity = new Activity(name, username, click, details, note, mes, AppConst.NOT_RES_YET, fullname, email, phone)
    this.activityservice.addActivity(activity).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
          this.followUserService.followUsers(AppConst.FEEDBACK_HOTEL);
          swal(AppConst.TKS_FB, AppConst.FB_SENT_SUCCESS, AppConst.SUCCESS)
        }
      },
      err => console.log(err)
    );
  }
}
