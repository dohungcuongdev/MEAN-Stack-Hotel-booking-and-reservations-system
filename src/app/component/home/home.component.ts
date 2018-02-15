import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //get routes parameter
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { FollowUsersService } from '../../service/follow-users.service';
import { User } from '../../model/user';
import { CookieService } from 'angular2-cookie/core';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private userservice: UserService,
    private data: InMemoryDataService,
    private cookie: CookieService,
    private followUserService: FollowUsersService) {
    this.followUserService.followUsers(AppConst.CLICK_HOMEPAGE)
  }

  ngOnInit(): void {
    let id = this.cookie.get("id")
    if (id == null || id == '') {
      let id = this.route.snapshot.params['id']
      //console.log(id)
      this.userservice.getUser(id).subscribe((user: User) => {
        //console.log(user)
        if (user.username != null) {
          this.cookie.put("id", id)
          this.auth.authenticated = true
          this.data.user = user
        }
      })
    }
  }
}
