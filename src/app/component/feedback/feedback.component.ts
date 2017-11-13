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
    this.followUserService.followUsers('click link /feedback');
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
    let name = "Feedback"
    let click = "feedback"
    let username = this.data.user.username
    let details = "Feedback sent successfully!"
    let note = "Rating with " + this.star + " ★"
    if (mes == null || mes == '')
      mes = 'no content'
    let fullname = this.data.user.name
    let email = username
    let phone = this.data.user.phone
    let activity = new Activity(name, username, click, details, note, mes, "Not Yet", fullname, email, phone)
    this.activityservice.addActivity(activity).subscribe(
      responsse => {
        if (responsse) {
          //this.roomservice.LoadData();
          this.followUserService.followUsers('send feedback for service');
          swal('Thanks for your feedback!', 'Your feedback is sent successfully!', 'success')
        }
      },
      err => console.log(err)
    );
  }
}
