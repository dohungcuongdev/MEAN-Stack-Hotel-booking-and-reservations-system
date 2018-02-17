import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import ApiService from './api.service';
import { Room } from '../model/room';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import * as AppConst from '../constant/app.const';

@Injectable()
export class RoomService extends ApiService<Room> {

    constructor(injector: Injector, public _http: Http) {
        super(injector)
        this.apiUrl = AppConst.ROOM_API_URL;
    }

    getAllRooms(): Observable<Room[]> {
        return this.getAll()
    }

    getRoom(room_name: string): Observable<Room> {
        return this.get(room_name)
    }

    bookRoom(room: Room): Observable<Response> {
        return this.updateToURL(AppConst.BOOK_ROOM_API, room.name, room)
    }

    feedbackRoom(room: Room): Observable<Response> {
        return this.updateToURL(AppConst.FEEDBACK_ROOM_API, room.name, room)
    }

    getAllRoomsFromURL(specialURL): Observable<Room[]> {
        return this.getAllFromURL(specialURL);
    }
}