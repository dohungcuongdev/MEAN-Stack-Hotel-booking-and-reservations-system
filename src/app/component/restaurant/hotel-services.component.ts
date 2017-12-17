import { Component } from '@angular/core';
import { HotelService } from '../../model/hotel-service';
import { RestaurantService } from '../../service/restaurant.service';
import { ActivatedRoute } from '@angular/router'; //get routes parameter
import { InMemoryDataService } from '../../service/in-memory-data.service';
import { FollowUsersService } from '../../service/follow-users.service';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'room-details',
  templateUrl: 'hotel-services.component.html',
  styleUrls: ['hotel-services.component.css']
})
export class HotelServicesComponent {

  hotel_serviceid = null

  constructor(
    private route: ActivatedRoute,
    private restaurantservice: RestaurantService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService) {
    this.hotel_serviceid = this.route.snapshot.params['id']
    this.restaurantservice.getHotelService(this.hotel_serviceid).subscribe((hotelservice: HotelService) => {
      if (hotelservice === null) {
        this.data.resetHotelservice()
      } else {
        this.data.hotelservice = hotelservice
        this.data.addImgURLService()
        this.followUserService.followUsers(AppConst.CLICK_HOTEL_SERVICE + hotelservice.name)
      }
    },
      err => {
        console.log(err)
        this.data.resetHotelservice()
      }
    )
  }
}
