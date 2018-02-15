import { User } from '../model/user';
import { HotelService } from '../model/hotel-service';
import { Room } from '../model/room';
import * as AppConst from '../constant/app.const';

export class InMemoryDataService {
  hotelservice: HotelService
  room: Room
  user: User
  no_img = AppConst.IMG_NOT_FOUND
  roomComponentName: String

  constructor() {
    this.resetHotelservice()
    this.resetRoom()
    this.resetUser()
  }

  resetHotelservice() {
    //this.hotelservice = new HotelService(AppConst.NOT_FOUND, null, 0, this.no_img, this.no_img, 0, null, null)
    this.hotelservice = new HotelService('', '', null, '', '', null, '', '')
  }

  resetRoom() {
    //this.room = new Room(AppConst.NOT_FOUND, 0, 0, 0, null, this.no_img, this.no_img, null, null, "", null, null, null, 0)
    this.room = new Room('', null, null, null, '', '', '', '', '', "", '', null, null, null)
  }

  resetUser() {
    this.user = new User(null, null, null, null, null, null)
  }

  addImgURLRoom() {
    this.room.imgwithURL = AppConst.ROOM_IMG_URL + this.room.img
    this.room.imgwithURL2 = AppConst.ROOM_IMG_URL + this.room.img2
  }

  addImgURLService() {
    this.hotelservice.imgwithURL = AppConst.RESTAURANT_IMG_URL + this.hotelservice.img
    this.hotelservice.imgwithURL2 = AppConst.RESTAURANT_IMG_URL + this.hotelservice.img2
  }
}
