import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import ApiService from './api.service';
import { FollowUsers } from '../model/follow-user';
import { Observable } from "rxjs/Observable";
import { InMemoryDataService } from '../service/in-memory-data.service';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FollowUsersService extends ApiService<FollowUsers> {

    constructor(injector: Injector, public _http: Http, private data: InMemoryDataService, private cookie: CookieService) {
        super(injector)
        this.apiUrl += 'follow-users/';
    }

    getAll(): Observable<FollowUsers[]> {
        return this.getAll()
    }

    getByID(id: string): Observable<FollowUsers> {
        return this.get(id)
    }

    getByUserIP(userIP: string): Observable<FollowUsers[]> {
        return this.getAllby(userIP, this.apiUrl + "userIP/")
    }

    addFollowUsers(follow_users: FollowUsers): Observable<Response> {
        return this.add(follow_users)
    }

    remove_follow_users(id: string): Observable<Response> {
        return this.remove(id)
    }

    edit_follow_users(follow_users: FollowUsers): Observable<Response> {
        return this.edit(follow_users._id, follow_users)
    }

    followUsers(url: string) {
        let duration = 0
        if (this.cookie.get("start_access") == null) {
            this.cookie.put("start_access", Date.now() + "")
            duration = 0
        } else {
            duration = Date.now() - +this.cookie.get("start_access");
            this.cookie.put("start_access", Date.now() + "")
        }

        this.addFollowUsers(new FollowUsers(this.data.user._id, this.data.user.username, url, duration)).subscribe(
            response => {
                if (response) {
                    console.log(response);
                }
            },
            err => console.log(err)
        );
    }
}