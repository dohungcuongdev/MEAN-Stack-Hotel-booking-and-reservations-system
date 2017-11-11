import { Injectable } from '@angular/core';
import { UserService } from './user.service'
import { User } from '../model/user';
import { InMemoryDataService } from '../service/in-memory-data.service';
import { CookieService } from 'angular2-cookie/core';
declare var swal: any;

@Injectable()

export class AuthenticationService {
    authenticated = false

    constructor(
        private data: InMemoryDataService,
        private userservice: UserService,
        private cookie: CookieService) { }

    public checkAuthentication() {
        let id = this.cookie.get("id")
        if (id != null && id != '') {
            this.userservice.getUser(id).subscribe((user: User) => {
                if (user.username != null) {
                    this.authenticated = true
                    this.data.user = user
                }
            })
        }
    }

    public pleaselogin(): void {
        swal({
            title: "Please login!",
            text: "Please login to use this feature",
            type: "warning",
            showCancelButton: true
        }, function () {
            window.location.href = '/login';
        });
    }
}