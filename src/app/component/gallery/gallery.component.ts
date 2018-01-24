import { Component, OnInit } from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.css']
})
export class GalleryComponent {

  imagesGallery = []

  constructor(private followUserService: FollowUsersService) {
    this.followUserService.followUsers(AppConst.CLICK_GALLERY)
  }

  ngOnInit() {
	this.showAllImgGallery()
  }
  
  showAllImgGallery() {
    for(var i = 0; i <= 86; i++) {
      this.imagesGallery[i] = "images/photos/" + i + ".jpg"
    }	  
  }
}
