import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  cartSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(
      (_cart) => (this.cart = _cart)
    );
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  openCart() {
    this.offcanvasService.open(CartComponent, { position: 'end' });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
