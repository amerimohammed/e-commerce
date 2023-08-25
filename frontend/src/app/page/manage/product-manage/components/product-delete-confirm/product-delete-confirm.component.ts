import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-delete-confirm',
  templateUrl: './product-delete-confirm.component.html',
  styleUrls: ['./product-delete-confirm.component.css'],
})
export class ProductDeleteConfirmComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log(this.product);
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    console.log(this.product);
    this.productService.deleteProduct(this.product).subscribe((response) => {
      console.log(response);
      this.closeModal('deleted');
    });
  }

  refresh() {
    window.location.reload();
  }
}
