import { Component } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { Activity } from '../../model/activity';
import { FollowUsersService } from '../../service/follow-users.service';

import * as swal from 'sweetalert';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})

export class ContactComponent {
  constructor(private activityservice: ActivityService, private followUserService: FollowUsersService) {
    this.followUserService.followUsers('click link /contact');
   }

  sendContact(fullname: string, email: string, phone: string, mes: string) {
    if (fullname === '' || email === '' || phone === '' || mes === '') {
      swal("Oops...", "Please input all neccesary information!", "error")
    } else {
      let name = "Send Contact"
      let username = "A guest with email: " + email
      let click = "contact"
      let details = "Message sent successfully."
      let note = "Waiting for response!"
      let activity = new Activity(name, username, click, details, note, mes, "Not Yet", fullname, email, phone)
      this.activityservice.addActivity(activity).subscribe(
        responsse => {
          if (responsse) {
            swal('Congrats!', 'Message send! Please waiting for our response. Thank you!', 'success')
          }
        },
        err => this.showErr(err)
      );
    }
  }

  showErr(err: string) {
    swal("Oops...", "Sorry. Something go wrong!", "error")
    console.log(err)
  }

}
