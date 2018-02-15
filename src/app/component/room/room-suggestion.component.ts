import { Component } from '@angular/core';
import { InMemoryDataService } from '../../service/in-memory-data.service';

@Component({
  selector: 'room-suggestion',
  template: '<rooms>Loading...</rooms>'
})
export class RoomsSuggestionComponent {

  public constructor(
    protected data: InMemoryDataService,
  ) {this.data.roomComponentName = 'Recommendation Rooms'}
}
