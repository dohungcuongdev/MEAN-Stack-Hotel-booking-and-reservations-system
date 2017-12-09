import { AuthenticationService } from '../../service/authentication.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthenticationService) {
    //called first time before the ngOnInit()
    this.auth.checkAuthentication()
  }

  ngOnChanges() {
    //ngOnChanges is called when an input or output binding value changes
  }

  ngOnInit(): void {
    //called after the constructor and called  after the first ngOnChanges() 
  }
}