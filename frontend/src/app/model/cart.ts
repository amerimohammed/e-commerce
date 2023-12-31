import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
}
