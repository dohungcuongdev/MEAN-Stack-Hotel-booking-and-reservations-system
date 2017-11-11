
import { User } from '../model/user';
import { HotelService } from '../model/hotel-service';
import { Room } from '../model/room';
import * as AppConst from '../constant/app.const';

export class InMemoryDataService {
  hotelservice: HotelService
  room: Room
  user: User
  no_img = "not_found.jpg"

  constructor() {
    this.resetHotelservice()
    this.resetRoom()
    this.resetUser()
  }

  resetHotelservice() {
    this.hotelservice = new HotelService("not found", null, 0, this.no_img, this.no_img, 0, null, null)
  }

  resetRoom() {
    this.room = new Room("not found", 0, 0, 0, null, this.no_img, this.no_img, null, null, "", null, null, null, 0)
  }

  resetUser() {
    this.user = new User(null, null, null, null, null, null)
  }

  addImgURLRoom() {
    this.room.imgwithURL = AppConst.roomImgUrl + this.room.img
    this.room.imgwithURL2 = AppConst.roomImgUrl + this.room.img2
  }

  addImgURLService() {
    this.hotelservice.imgwithURL = AppConst.restaurantImgUrl + this.hotelservice.img
    this.hotelservice.imgwithURL2 = AppConst.restaurantImgUrl + this.hotelservice.img2
  }

}
