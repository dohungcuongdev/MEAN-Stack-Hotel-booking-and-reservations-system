import { Injectable } from '@angular/core';
import { UserService } from './user.service'
import { User } from '../model/user';
import { InMemoryDataService } from '../service/in-memory-data.service';
import { CookieService } from 'angular2-cookie/core';
import * as AppConst from '../constant/app.const';  //use constant
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
            //console.log(id)
            this.userservice.getUser(id).subscribe((user: User) => {
                //console.log(user)
                if (user.username != null) {
                    this.authenticated = true
                    this.data.user = user
                }
            })
        }
    }

    public pleaselogin(): void {
        swal({
            title: AppConst.LOGIN_RES,
            text:  AppConst.LOGIN_TO_USE,
            type: "warning",
            showCancelButton: true
        }, function () {
            window.location.href = '/login';
        });
    }
}