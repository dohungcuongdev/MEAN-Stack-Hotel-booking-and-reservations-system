import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { GalleryComponent } from '../component/gallery/gallery.component';
import { RoomDetailComponent } from '../component/room/room-details.component';
import { RoomsTariffComponent } from '../component/room/rooms-tariff.component';
import { IntroductionComponent } from '../component/introduction/introduction.component';
import { ContactComponent } from '../component/contact/contact.component';
import { RestaurantComponent } from '../component/restaurant/restaurant.component'
import { HotelServicesComponent } from '../component/restaurant/hotel-services.component'
import { FeedBackComponent } from '../component/feedback/feedback.component';
import { TopRoomComponent } from '../component/room/top-room.component';
import { RoomsSuggestionComponent } from '../component/room/room-suggestion.component';

const routing: Routes = [
    {
        path: '', redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'top-room', component: TopRoomComponent },
    { path: 'room-suggestion', component: RoomsSuggestionComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'rooms-tariff', component: RoomsTariffComponent },
    { path: 'room-details/:id', component: RoomDetailComponent },
    { path: 'restaurant', component: RestaurantComponent },
    { path: 'hotel-services/:id', component: HotelServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'feedback', component: FeedBackComponent },
    { path: "**", redirectTo: '/' }
]
export const AppRoutes = RouterModule.forRoot(routing);
//export const AppRoutes = RouterModule.forRoot(routing, { useHash: true });