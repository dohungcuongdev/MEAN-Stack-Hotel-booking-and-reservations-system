import { Component } from '@angular/core';
import { InMemoryDataService } from '../../service/in-memory-data.service';

@Component({
  selector: 'rooms-tariff',
  template: '<rooms>Loading...</rooms>'
})
export class RoomsTariffComponent {

  public constructor(
    protected data: InMemoryDataService,
  ) { this.data.roomComponentName = 'Rooms & Tariff' }
}
