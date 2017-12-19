import { Component } from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['introduction.component.css']
})

export class IntroductionComponent {
  constructor(private followUserService: FollowUsersService) {
    this.followUserService.followUsers(AppConst.CLICK_INTRO)
  }
  hotelIntro = AppConst.HOTEL_INTRO
  roomIntro = AppConst.ROOM_INTRO
  restaurantIntro = AppConst.RESTAURANT_INTRO
}
