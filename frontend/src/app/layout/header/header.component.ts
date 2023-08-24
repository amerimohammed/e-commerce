import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(
      (_cart) => (this.cart = _cart)
    );
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
