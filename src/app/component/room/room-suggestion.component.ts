import { Component, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import * as AppConst from '../../constant/app.const';
import { CapitalizePipe } from "../../pipe/capitalize.pipe";
import { FollowUsersService } from '../../service/follow-users.service';

@Component({
  selector: 'room-suggestion',
  templateUrl: 'room-suggestion.component.html',
  styleUrls: ['room-suggestion.component.css']
})
export class RoomsSuggestionComponent implements OnInit {

  numpage: number
  pages = []
  rooms_page = []
  pageclicked = 1
  searchselected = 'all'
  searchboxvalue = ''
  listrooms = []

  public constructor(
    private router: Router,
    private roomservice: RoomService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService
  ) {
    this.followUserService.followUsers(AppConst.CLICK_SUGGEST_ROOM);
  }

  public ngOnInit(): void {
    //get list all rooms
    this.roomservice.getAllRoomsFromURL(AppConst.EXPRESS_API_URL + AppConst.SUGGEST_ROOM_API).subscribe((listrooms: Room[]) => {
      this.listrooms = listrooms
      this.addImgURLRooms()
      this.initializeNumPage()
      this.initializeRoomOfPage()
    })
  }


  private addImgURLRooms(): void {
    for (var i = 0; i < this.listrooms.length; i++) {
      this.listrooms[i].imgwithURL = AppConst.ROOM_IMG_URL + this.listrooms[i].img
      this.listrooms[i].imgwithURL2 = AppConst.ROOM_IMG_URL + this.listrooms[i].img2
    }
  }

  private initializeNumPage(): void {
    this.numpage = (this.listrooms.length % 6 == 0)
      ? Math.floor(this.listrooms.length / 6)
      : this.numpage = Math.floor(this.listrooms.length / 6) + 1
    for (var i = 1; i <= this.numpage; i++) this.pages.push(i)
  }

  private initializeRoomOfPage(): void {
    this.rooms_page = []
    for (var i = Math.floor(this.pageclicked - 1) * 6; i < this.pageclicked * 6; i++) {
      if (i >= this.listrooms.length) break
      this.rooms_page.push(this.listrooms[i])
    }
  }

  private clickpage(index: number): void {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.pageclicked = index
    this.initializeRoomOfPage()
  }

  private clickpreviouspage(): void {
    if (this.pageclicked > 1) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      --this.pageclicked
      this.initializeRoomOfPage()
    }
  }

  private clicknextpage(): void {
    if (this.pageclicked < this.pages.length) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      ++this.pageclicked
      this.initializeRoomOfPage()
    }
  }

  private resetpage(): void {
    this.rooms_page = []
    this.pages = []
    this.pageclicked = 1
  }

  private viewRoomDetails(id: string): void {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.router.navigate(['/room-details', id]);
  }

  private search(room_infor: string): void {
    this.followUserService.followUsers(AppConst.FILTER_ROOM + room_infor)
    this.resetpage()
    this.searchselected = room_infor
    if (room_infor === 'all')
      this.ngOnInit()
    else {
      this.pages = [1]
      if (AppConst.ROOM_TYPES.includes(room_infor)) {
        for (var i = 0; i < this.listrooms.length; i++)
          if (this.listrooms[i].type === room_infor)
            this.rooms_page.push(this.listrooms[i])
      } else {
        for (var i = 0; i < this.listrooms.length; i++)
          if (this.listrooms[i].status === room_infor)
            this.rooms_page.push(this.listrooms[i])
      }
    }
  }

  private searchInput(key: string): void {
    if (key !== '') {
      this.followUserService.followUsers(AppConst.SEARCH_ROOM + key)
      this.resetpage()
      this.searchboxvalue = key
      this.searchselected = "Keyword '" + key + "'"
      this.pages = [1]
      for (var i = 0; i < this.listrooms.length; i++) {
        if (this.listrooms[i].name.toLowerCase().includes(key.toLowerCase()))
          this.rooms_page.push(this.listrooms[i])
      }
    }
  }

  private clickImage(img: string) {
    this.followUserService.followUsers(AppConst.CLICK_IMG_ROOM + img)
  }
}
