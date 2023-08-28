import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product, ProductImage } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ImageService } from '../image/image.service';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.css'],
})
export class ProductEditFormComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  productImages: Array<ProductImage> = [];
  imagesSubscription: Subscription | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    console.log(this.product);
    this.imagesSubscription = this.imageService.images.subscribe(
      (_images) => (this.productImages = _images)
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    this.product.productImages = this.productImages;
    console.log(this.product);
    console.log(this.productImages);
    this.productService.createProduct(this.product).subscribe((response) => {
      console.log(response);
      this.closeModal('saved');
    });
  }

  refresh() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
