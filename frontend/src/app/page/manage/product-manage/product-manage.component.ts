import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditFormComponent } from './components/product-edit-form/product-edit-form.component';
import { Product, ProductImage } from 'src/app/model/product';
import { ProductDeleteConfirmComponent } from './components/product-delete-confirm/product-delete-confirm.component';
import { Subscription } from 'rxjs';
import { ImageService } from './components/image/image.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
})
export class ProductManageComponent {
  private product: Product;

  constructor(
    private modalService: NgbModal,
    private imageService: ImageService
  ) {
    this.product = this.initializeProduct();
  }

  openModal() {
    const modalRef = this.modalService.open(ProductEditFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    modalRef.componentInstance.product = this.product;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ProductDeleteConfirmComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    modalRef.componentInstance.product = this.product;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openModalCreate() {
    this.product = this.initializeProduct();
    this.imageService.images.next([]);
    this.openModal();
  }

  openModalEdit(product: Product): void {
    this.product = product;
    this.imageService.images.next(product.productImages);
    this.openModal();
  }

  openModalDelete(product: Product): void {
    this.product = product;
    this.openDeleteModal();
  }

  private initializeProduct(): Product {
    return {
      productId: 0,
      code: '',
      title: '',
      price: 0,
      currentQuantity: 10,
      soldQuantity: 0,
      description: '',
      productImages: [],
    };
  }
}
