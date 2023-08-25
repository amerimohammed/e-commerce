import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditFormComponent } from './components/product-edit-form/product-edit-form.component';
import { Product } from 'src/app/model/product';
import { ProductDeleteConfirmComponent } from './components/product-delete-confirm/product-delete-confirm.component';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
})
export class ProductManageComponent {
  private product: Product;
  constructor(private modalService: NgbModal) {
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
    this.openModal();
  }

  openModalEdit(product: Product): void {
    this.product = product;
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
