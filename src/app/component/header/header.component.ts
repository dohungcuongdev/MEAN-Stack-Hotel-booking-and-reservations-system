import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { User } from '../../model/user';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router,
    private auth: AuthenticationService,
    private userservice: UserService,
    private data: InMemoryDataService,
    private cookie: CookieService) { }

  login() {
    if (this.auth.authenticated == false)
      location.href = '/login'
    else
      location.href = '/'
  }

  logout() {
    this.auth.authenticated = false
    this.data.resetUser()
    this.cookie.remove('id')
    location.href = '/logout'
  }
}
