import { Component } from '@angular/core';
import * as AppConst from '../../constant/app.const';

@Component({
  selector: 'footer',
  templateUrl: 'footer.component.html',
})

export class FooterComponent {
  footercontent = AppConst.FOOTER
}
