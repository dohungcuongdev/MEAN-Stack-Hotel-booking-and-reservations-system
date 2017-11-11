import { Component, OnInit } from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';

@Component({
  selector: 'gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.css']
})
export class GalleryComponent {
  constructor(private followUserService: FollowUsersService) { 
    this.followUserService.followUsers('click link /gallery');
  }

 }
