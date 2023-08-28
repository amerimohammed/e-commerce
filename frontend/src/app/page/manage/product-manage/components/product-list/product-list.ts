import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  PipeTransform,
} from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/service/product.service';
import { AppState } from 'src/app/model/app-state';
import { CustomResponse, ProductsType } from 'src/app/model/custom-response';
import { DataState } from 'src/app/enum/data-state.enum';
import { Product } from 'src/app/model/product';
import { MatIconModule } from '@angular/material/icon';
import { env } from 'src/environments/environment';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [
    DecimalPipe,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    MatIconModule,
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  providers: [DecimalPipe],
})
export class ProductList implements OnInit, OnDestroy {
  appState: AppState<CustomResponse<ProductsType>> = {
    dataState: DataState.LOADING,
  };
  private productSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;
  products$: Observable<Product[] | undefined>;
  filter = new FormControl('', { nonNullable: true });

  @Output() onEditProduct = new EventEmitter<Product>();
  @Output() onDeleteProduct = new EventEmitter<Product>();

  constructor(pipe: DecimalPipe, private productService: ProductService) {
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );

    this.productSubscription = this.productService
      .getAllproducts()
      .subscribe((response) => {
        this.appState = {
          dataState: DataState.LOADED,
          appData: response,
        };

        this.products$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text, pipe))
        );
      });
  }

  ngOnInit(): void {}

  search(text: string, pipe: PipeTransform): Product[] | undefined {
    return this.appState.appData?.data.products.filter((product) => {
      const term = text.toLowerCase();
      return (
        product.code.toLowerCase().includes(term) ||
        product.title.toLowerCase().includes(term) ||
        pipe.transform(product.price).includes(term)
      );
    });
  }

  editProduct(product: Product) {
    this.onEditProduct.emit(product);
  }

  deleteProduct(product: Product) {
    this.onDeleteProduct.emit(product);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
