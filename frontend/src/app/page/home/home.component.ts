import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataState } from 'src/app/enum/data-state.enum';
import { AppState } from 'src/app/model/app-state';
import { CustomResponse, ProductsType } from 'src/app/model/custom-response';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  count = 12;
  sort = 'desc';

  appState: AppState<CustomResponse<ProductsType>> = {
    dataState: DataState.LOADING,
  };
  readonly DataState = DataState;

  productSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productSubscription = this.productService
      .getAllproducts()
      .subscribe((_products) => {
        console.log(_products);
        this.appState = {
          dataState: DataState.LOADED,
          appData: _products,
        };
      });
  }

  onColumnsCountChanged(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number) {
    this.count = count;
  }

  onSortChange(sort: string) {
    this.sort = sort;
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({ product, quantity: 1 });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
