import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import ApiService from './api.service';
import { FollowUsers } from '../model/follow-user';
import { Observable } from "rxjs/Observable";
import { InMemoryDataService } from '../service/in-memory-data.service';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
import * as AppConst from '../constant/app.const';  //use constant

@Injectable()
export class FollowUsersService extends ApiService<FollowUsers> {

    constructor(injector: Injector, public _http: Http, private data: InMemoryDataService, private cookie: CookieService) {
        super(injector)
        this.apiUrl = AppConst.FOLLOWUSER_API_URL;
    }

    getAll(): Observable<FollowUsers[]> {
        return this.getAll()
    }

    getByID(id: string): Observable<FollowUsers> {
        return this.get(id)
    }

    getByUserIP(userIP: string): Observable<FollowUsers[]> {
        return this.getAllby(userIP, AppConst.USER_IP_FULL_API)
    }

    addFollowUsers(follow_users: FollowUsers): Observable<Response> {
        return this.add(follow_users)
    }

    remove_follow_users(id: string): Observable<Response> {
        return this.remove(id)
    }

    edit_follow_users(follow_users: FollowUsers): Observable<Response> {
        return this.edit(follow_users.id, follow_users)
    }

    followUsers(new_page_access: string) {
        if (this.cookie.get("page_access") == null || this.cookie.get("time_access") == null) {
            // if no page access => store new page acess and time access
            this.cookie.put("page_access", new_page_access);
            this.cookie.put("time_access", Date.now().toString());
            
        } else {
            // if access a page before => update this page to db + store 'new page access'
            
            // update 'page before' to db
            var page_access_before = this.cookie.get("page_access")
            var time_access_before = this.cookie.get("time_access")
            var new_time_access = Date.now();
            var duration = new_time_access - +time_access_before; // total time stay in 'before page'
            this.addFollowUsers(new FollowUsers(this.data.user.username, page_access_before, duration)).subscribe(
                response => {
                    if (response) {
                        console.log(response);
                    }
                },
                err => console.log(err)
            );

            // store 'new page access'
            this.cookie.put('page_access', new_page_access);
            this.cookie.put('time_access', new_time_access.toString());
        }
    }
}