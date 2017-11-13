import { Component, OnInit } from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.css']
})
export class GalleryComponent {
  constructor(private followUserService: FollowUsersService) { 
    this.followUserService.followUsers(AppConst.CLICK_GALLERY);
  }

 }
