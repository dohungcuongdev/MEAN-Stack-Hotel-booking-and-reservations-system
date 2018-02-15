import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../model/hotel-service';
import { Router } from '@angular/router';
import { RestaurantService } from '../../service/restaurant.service';
import { InMemoryDataService } from '../../service/in-memory-data.service';
import * as AppConst from '../../constant/app.const';
import { CapitalizePipe } from "../../pipe/capitalize.pipe";
import { FollowUsersService } from '../../service/follow-users.service';
import 'rxjs/add/operator/catch'; //http catch error

@Component({
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  numpage: number
  pages = []
  services_page = []
  pageclicked = 1
  searchboxvalue = ''
  searchselected = 'all'
  listservice = []
  isloading = true

  public constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private data: InMemoryDataService,
    private followUserService: FollowUsersService
  ) { }

  public ngOnInit(): void {
    this.showAllRestaurantItems()
    this.isloading = false
    this.followUserService.followUsers(AppConst.CLICK_RESTAURANT);
  }
  
  private showAllRestaurantItems() {
	//get list all services
    this.restaurantService.getAllService().subscribe((listservice: HotelService[]) => {
      this.listservice = listservice
      this.initializeNumPage()
      this.initializeServiceOfPage()
      this.isloading = true
    })
  }

  private getFullImgURL(imgName) {
    return AppConst.RESTAURANT_IMG_URL + imgName
  }

  private initializeNumPage(): void {
    this.numpage = (this.listservice.length % 4 == 0)
      ? Math.floor(this.listservice.length / 4)
      : this.numpage = Math.floor(this.listservice.length / 4) + 1
    for (var i = 1; i <= this.numpage; i++) this.pages.push(i)
  }

  private initializeServiceOfPage(): void {
    let temp = this.listservice.length
    if(temp > 6)
        temp = 6
    for (var i = 0; i < temp; i++) {
      this.services_page.push(this.listservice[i])
    }
  }

  private setServiceOfPage(): void {
    this.services_page = []
    for (var i = Math.floor(this.pageclicked - 1) * 4; i < this.pageclicked * 4; i++) {
      if (i >= this.listservice.length) break
      this.services_page.push(this.listservice[i])
    }
  }

  private clickpage(index: number): void {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.pageclicked = index
    this.setServiceOfPage()
  }

  private clickpreviouspage(): void {
    if (this.pageclicked > 1) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      --this.pageclicked
      this.setServiceOfPage()
    }
  }

  private clicknextpage(): void {
    if (this.pageclicked < this.pages.length) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      ++this.pageclicked
      this.setServiceOfPage()
    }
  }

  private viewServiceDetails(id: string): void {
    this.router.navigate(['/hotel-services', id]);
  }

  private resetpage(): void {
    this.services_page = []
    this.pages = []
    this.pageclicked = 1
  }

  private search(type: string): void {
    this.followUserService.followUsers(AppConst.FILTER_RESTAURANT + type)
    this.resetpage()
    this.searchselected = type
    if (type === 'all') {
      this.searchselected = 'all'
      this.ngOnInit()
    } else {
      this.pages = [1]
      for (var i = 0; i < this.listservice.length; i++) {
        if (this.listservice[i].type === type)
          this.services_page.push(this.listservice[i])
      }
    }
  }

  private searchInput(key: string): void {
    if (key !== '') {
      this.followUserService.followUsers(AppConst.SEARCH_RESTAURANT + key)
      this.resetpage()
      this.searchselected = "Keyword '" + key + "'"
      this.searchboxvalue = key
      this.pages = [1]
      for (var i = 0; i < this.listservice.length; i++) {
        if (this.listservice[i].name.toLowerCase().includes(key.toLowerCase()))
          this.services_page.push(this.listservice[i])
      }
    }
  }

  private clickImage(img: string) {
    this.followUserService.followUsers(AppConst.CLICK_IMG_RESTAURANT + img)
  }
}
