import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find(
      (_item) => _item.product.productId === item.product.productId
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem): void {
    const items = this.cart.value.items.filter(
      (_item) => _item.product.productId !== item.product.productId
    );
    this.cart.next({ items });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    if (item.quantity === 1) {
      this.removeFromCart(item);
    } else {
      const updatedItem = this.cart.value.items.find(
        (_item) => _item.product.productId === item.product.productId
      );
      if (updatedItem) {
        updatedItem.quantity--;
        this.cart.next({ items: this.cart.value.items });
        this._snackBar.open('1 item removed from cart.', 'Ok', {
          duration: 3000,
        });
      }
    }
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', { duration: 3000 });
  }

  getTotal(): number {
    return this.cart.value.items
      .map(this.getSubTotal)
      .reduce((total, subTotal) => total + subTotal, 0);
  }

  getSubTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getTotalQuantity(): number {
    return this.cart.value.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getItems(): CartItem[] {
    return this.cart.value.items;
  }
}
