import { Component } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  closeResult = '';

  constructor(public activeOffCanvas: NgbActiveOffcanvas) {}

  closeOffCanvas(sendData: any) {
    this.activeOffCanvas.close(sendData);
  }
}
