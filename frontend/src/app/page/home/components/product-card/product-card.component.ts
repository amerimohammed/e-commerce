import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  apiUrl = env.apiUrl;

  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
