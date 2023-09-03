import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  apiUrl = env.apiUrl;
  cart: Cart = { items: [] };
  cartSubscription: Subscription | undefined;

  constructor(
    public activeOffCanvas: NgbActiveOffcanvas,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  closeOffCanvas(sendData: any) {
    this.activeOffCanvas.close(sendData);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  addOne(item: CartItem) {
    this.cartService.addToCart(item);
  }

  removeOne(item: CartItem) {
    this.cartService.removeQuantity(item);
  }
  checkout() {
    this.closeOffCanvas('checkout');
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
