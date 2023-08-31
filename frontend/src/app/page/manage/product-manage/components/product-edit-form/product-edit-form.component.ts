import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product, ProductImage } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ImageService } from '../image/image.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.css'],
})
export class ProductEditFormComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  productImages: Array<ProductImage> = [];
  imagesSubscription: Subscription | undefined;

  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private imageService: ImageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.imagesSubscription = this.imageService.images.subscribe(
      (_images) => (this.productImages = _images)
    );

    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    if (this.currentUser) {
      this.product.productImages = this.productImages;
      this.productService
        .createProduct(this.product, this.currentUser.token)
        .subscribe((response) => {
          console.log(response);
          this.closeModal('saved');
        });
    }
  }

  refresh() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
