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

  constructor(
    private router: Router,
    private roomservice: RoomService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService) {
    this.followUserService.followUsers('click link /top-room');
  }

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
        listrooms[i].numvote = this.check(listrooms[i].numvote)
        if (listrooms[i].numvote == 0)
          listrooms[i].average_star = 0
        else
          listrooms[i].average_star = listrooms[i].star / listrooms[i].numvote
      }
    })
  }
}
