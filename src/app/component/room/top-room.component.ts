import { Component, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import * as AppConst from '../../constant/app.const';
import { CapitalizePipe } from "../../pipe/capitalize.pipe";
import { FollowUsersService } from '../../service/follow-users.service';
declare var swal: any;

@Component({
  selector: 'top-room',
  templateUrl: 'top-room.component.html',
  styleUrls: ['top-room.component.css']
})

export class TopRoomComponent implements OnInit {

  listrooms = []
  isloading = true

  constructor(
    private router: Router,
    private roomservice: RoomService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService) { }

  check(value: any): number {
    if (value == null || typeof value == undefined || isNaN(value)) {
      return 0;
    }
    return value;
  }

  ngOnInit(): void {
    this.roomservice.getAllRooms().subscribe((listrooms: Room[]) => {
      this.listrooms = listrooms
      for (var i = 0; i < listrooms.length; i++) {
        listrooms[i].star = this.check(listrooms[i].star);
        listrooms[i].numvote = this.check(listrooms[i].numvote);
        listrooms[i].imgwithURL = AppConst.ROOM_IMG_URL + this.listrooms[i].img;
        listrooms[i].average_star = (listrooms[i].numvote == 0) ? 0 : listrooms[i].star / listrooms[i].numvote
      }
      this.isloading = true
    })
    this.isloading = false
    this.followUserService.followUsers(AppConst.CLICK_TOPROOM);
  }

  private clickImage(room: string) {
    this.followUserService.followUsers(AppConst.CLICK_IMG_ROOM + room);
  }

  private getClassForRoomType(roomtype: string): string {
    return 'color-row-' + roomtype;
  }
}