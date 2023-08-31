import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-delete-confirm',
  templateUrl: './product-delete-confirm.component.html',
  styleUrls: ['./product-delete-confirm.component.css'],
})
export class ProductDeleteConfirmComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (_user) => {
        this.currentUser = _user;
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    if (this.currentUser) {
      this.productService
        .deleteProduct(this.product, this.currentUser.token)
        .subscribe((response) => {
          console.log(response);
          this.closeModal('deleted');
        });
    }
  }

  refresh() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
