import { Component, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import * as AppConst from '../../constant/app.const';
import { CapitalizePipe } from "../../pipe/capitalize.pipe";
import { FollowUsersService } from '../../service/follow-users.service';

@Component({
  selector: 'room-component'
})
export class RoomComponent {

  numRoomsEachPage: number
  numpage: number
  pages = []
  rooms_page = []
  pageclicked = 1
  searchselected = 'all'
  searchboxvalue = ''
  listrooms = []

  public constructor(
    protected router: Router,
    protected roomservice: RoomService,
    protected data: InMemoryDataService,
    protected followUserService: FollowUsersService
  ) {}

  protected getFullImgURL(imgName) {
    return AppConst.ROOM_IMG_URL + imgName
  }

  protected initializeNumPage(): void {
    this.numpage = (this.listrooms.length % this.numRoomsEachPage == 0)
      ? Math.floor(this.listrooms.length / this.numRoomsEachPage)
      : this.numpage = Math.floor(this.listrooms.length / this.numRoomsEachPage) + 1
    this.pages = new Array(this.numpage)
  }

  protected initializeRoomOfPage(): void {
    let temp = this.listrooms.length
    if(temp > this.numRoomsEachPage)
        temp = this.numRoomsEachPage
    for (var i = 0; i < temp; i++) {
      this.rooms_page.push(this.listrooms[i])
    }
  }

  protected setRoomOfPage(): void {
    this.rooms_page = []
    for (var i = Math.floor(this.pageclicked - 1) * this.numRoomsEachPage; i < this.pageclicked * this.numRoomsEachPage; i++) {
      if (i >= this.listrooms.length) break
      this.rooms_page.push(this.listrooms[i])
    }
  }

  protected clickpage(index: number): void {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.pageclicked = index
    this.setRoomOfPage()
  }

  protected clickpreviouspage(): void {
    if (this.pageclicked > 1) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      --this.pageclicked
      this.setRoomOfPage()
    }
  }

  protected clicknextpage(): void {
    if (this.pageclicked < this.pages.length) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      ++this.pageclicked
      this.setRoomOfPage()
    }
  }

  protected resetpage(): void {
    this.rooms_page = []
    this.pages = []
    this.pageclicked = 1
  }

  protected viewRoomDetails(id: string): void {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.router.navigate(['/room-details', id]);
  }

  protected searchInput(key: string): void {
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

  protected clickImage(room: string) {
    this.followUserService.followUsers(AppConst.CLICK_IMG_ROOM + room);
  }
}
