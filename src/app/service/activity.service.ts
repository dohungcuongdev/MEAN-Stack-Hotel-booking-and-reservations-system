import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import ApiService from './api.service';
import { Activity } from '../model/activity';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import * as AppConst from '../constant/app.const';  //use constant

@Injectable()
export class ActivityService extends ApiService<Activity> {

    constructor(injector: Injector, public _http: Http) {
        super(injector)
        this.apiUrl = AppConst.ACTIVITY_API_URL;
    }

    getAllActivity(): Observable<Activity[]> {
        return this.getAll()
    }

    getActivityByID(id: string): Observable<Activity> {
        return this.get(id)
    }

    getAllActivityByUserName(username: string): Observable<Activity[]> {
        return this.getAllby(username, AppConst.ACTIVITY_UN_API_URL)
    }

    getFeedbackRoomById(roomid: string): Observable<Activity[]> {
        return this.getAllby(roomid, AppConst.ACTIVITY_FB_ROOM_API_URL)
    }

    getListFeedbackHotel(): Observable<Activity[]> {
        return this.getAllFromURL(AppConst.ACTIVITY_FB_API_URL)
    }

    addActivity(activity: Activity): Observable<Response> {
        return this.add(activity)
    }

    removeActivity(id: string): Observable<Response> {
        return this.remove(id)
    }

    editActivity(activity: Activity): Observable<Response> {
        return this.edit(activity.id, activity)
    }
}