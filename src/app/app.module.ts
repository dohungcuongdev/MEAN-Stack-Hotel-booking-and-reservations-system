
//angular 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';


//component
import { AppComponent } from './component/app/app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component'
import { GalleryComponent } from './component/gallery/gallery.component';
import { RoomsComponent } from './component/room/rooms.component';
import { RoomDetailComponent } from './component/room/room-details.component';
import { RoomsTariffComponent } from './component/room/rooms-tariff.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { ContactComponent } from './component/contact/contact.component';
import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { HotelServicesComponent } from './component/restaurant/hotel-services.component';
import { FeedBackComponent } from './component/feedback/feedback.component';
import { TopRoomComponent } from './component/room/top-room.component';
import { RoomsSuggestionComponent } from './component/room/room-suggestion.component';
import { ReservationComponent } from './component/reservation/reservation.component';

//service
import { UserService } from './service/user.service';
import { ActivityService } from './service/activity.service';
import { RoomService } from './service/room.service';
import { RestaurantService } from './service/restaurant.service';
import { FollowUsersService } from './service/follow-users.service';
import { AuthenticationService } from './service/authentication.service';
import { InMemoryDataService } from './service/in-memory-data.service';
import { ValidationService } from './service/validation.service'

//routes
import { AppRoutes } from './router-link/app.routes';

//pipe
import { CapitalizePipe } from "./pipe/capitalize.pipe";
import { ConvertDatePipe } from "./pipe/convertdate.pipe";
import { DecimalPipe } from "./pipe/decimal.pipe";
import { OrderByPipe } from "./pipe/orderby.pipe";
import { ToArrayPipe } from "./pipe/toarray";

//directive
import { IntroDirective } from "./directive/introduction-directive";
import { RandomColorDirective } from "./directive/random-color-directive"

@NgModule({
  declarations: [
    AppComponent, //component
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    GalleryComponent,
    RoomsComponent,
    RoomDetailComponent,
    RoomsTariffComponent,
    IntroductionComponent,
    ContactComponent,
    RestaurantComponent,
    HotelServicesComponent,
    FeedBackComponent,
    TopRoomComponent,
    RoomsSuggestionComponent,
    ReservationComponent,
    CapitalizePipe, //pipe
    DecimalPipe,
    ConvertDatePipe,
    OrderByPipe,
    ToArrayPipe,
    IntroDirective, //directive
    RandomColorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [
    CookieService, 
    UserService,
    ActivityService,
    FollowUsersService,
    RoomService,
    RestaurantService,
    AuthenticationService,
    InMemoryDataService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
