import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { AppState } from './model/app-state';
import { CustomResponse } from './model/custom-response';
import { Product } from './model/product';
import { DataState } from './enum/data-state.enum';
import { ProductService } from './service/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  appState: AppState<CustomResponse<Product[]>> = {
    dataState: DataState.LOADING,
  };
  readonly DataState = DataState;
  productSubscription: Subscription | undefined;

  constructor(private proudctService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productSubscription = this.proudctService
      .getAllproducts()
      .subscribe((_products) => {
        console.log(_products);
        this.appState = {
          dataState: DataState.LOADED,
          appData: _products,
        };
      });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
