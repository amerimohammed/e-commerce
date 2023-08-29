import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataState } from 'src/app/enum/data-state.enum';
import { AppState } from 'src/app/model/app-state';
import { CustomResponse, ProductType } from 'src/app/model/custom-response';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  apiUrl = env.apiUrl;
  productId: number = 0;
  private mainImageUrl$ = new BehaviorSubject<string>('/images/product.png');
  mainImageUrl: string = '/images/product.png';
  appState: AppState<CustomResponse<ProductType>> = {
    dataState: DataState.LOADING,
  };
  readonly DataState = DataState;
  productSubscription: Subscription | undefined;
  imageUrlSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const paramId: string | null =
      this.route.snapshot.paramMap.get('productId');
    if (paramId) {
      this.productId = +paramId;
    }

    this.getProduct(this.productId);

    this.imageUrlSubscription = this.mainImageUrl$.subscribe((_imageUrl) => {
      this.mainImageUrl = _imageUrl;
    });
  }

  getProduct(productId: number): void {
    this.productSubscription = this.productService
      .getProduct(this.productId)
      .subscribe((response) => {
        this.appState = {
          dataState: DataState.LOADED,
          appData: response,
        };
        this.mainImageUrl$.next(
          response.data.product.productImages[0].imageUrl
        );
      });
  }

  changeImageUrl(imageUrl: string): void {
    this.mainImageUrl$.next(imageUrl);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({ product: product, quantity: 1 });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    if (this.imageUrlSubscription) {
      this.imageUrlSubscription.unsubscribe();
    }
  }
}
