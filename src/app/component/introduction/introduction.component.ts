import { Component} from '@angular/core';
import { FollowUsersService } from '../../service/follow-users.service';

@Component({
  selector: 'introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['introduction.component.css']
})
export class IntroductionComponent {
  constructor(private followUserService: FollowUsersService) { 
    this.followUserService.followUsers('click link /introduction');
  }
  hotelIntro = 'This is one of the biggest hotel of the world. The owner of this hotel is Đỗ Hùng Cường. He is also the manager of hotel. If you have any question or you need help you can reach him on this number: 0908998923'
  roomIntro = 'There are more than 20 rooms with many types of room in this hotel such as Deluxe, Family, Couple, Single that suitable with all your condition'
  restaurantIntro = 'There is 3 restaurants in this hotel. These restaurants provide food, drink, fruit and ice-cream for breakfast, lunch, dinner of snack'
}
