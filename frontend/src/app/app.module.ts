import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbAlertModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './page/home/home.component';
import { ProductCardComponent } from './page/home/components/product-card/product-card.component';
import { ProductsHeaderComponent } from './page/home/components/products-header/products-header.component';
import { ProductManageComponent } from './page/manage/product-manage/product-manage.component';
import { FormsModule } from '@angular/forms';
import { ProductList } from './page/manage/product-manage/components/product-list/product-list';
import { ProductEditFormComponent } from './page/manage/product-manage/components/product-edit-form/product-edit-form.component';
import { ProductDeleteConfirmComponent } from './page/manage/product-manage/components/product-delete-confirm/product-delete-confirm.component';
import { ImageListComponent } from './page/manage/product-manage/components/image/image-list/image-list.component';
import { ImageUploadFormComponent } from './page/manage/product-manage/components/image/image-upload-form/image-upload-form.component';
import { ProductComponent } from './page/product/product.component';
import { NgbdRatingTemplate } from './page/product/components/rating-template';
import { LoginModalComponent } from './layout/login-modal/login-modal';
import { AuthComponent } from './layout/header/components/auth/auth.component';
import { DashboardComponent } from './page/manage/dashboard/dashboard.component';
import { UserManageComponent } from './page/manage/user-manage/user-manage.component';
import { OrderManageComponent } from './page/manage/order-manage/order-manage.component';
import { UserDeleteConfirmComponent } from './page/manage/user-manage/components/user-delete-confirm/user-delete-confirm.component';
import { UserList } from './page/manage/user-manage/components/user-list/user-list';
import { UserEditFormComponent } from './page/manage/user-manage/components/user-edit-form/user-edit-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProductSlideComponent } from './page/home/components/product-slide/product-slide.component';
import { SlideDeleteConfirmComponent } from './page/manage/slide-manage/components/slide-delete-confirm/slide-delete-confirm.component';
import { SlideEditFormComponent } from './page/manage/slide-manage/components/slide-edit-form/slide-edit-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SlideManageComponent } from './page/manage/slide-manage/slide-manage.component';
import { SlideList } from './page/manage/slide-manage/components/product-list/slide-list';
import { CartComponent } from './layout/header/components/cart/cart.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { SuccessPaymentComponent } from './page/success-payment/success-payment.component';
import { FailPaymentComponent } from './page/fail-payment/fail-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductCardComponent,
    ProductsHeaderComponent,
    ProductManageComponent,
    ProductEditFormComponent,
    ProductDeleteConfirmComponent,
    ImageListComponent,
    ImageUploadFormComponent,
    ProductComponent,
    LoginModalComponent,
    AuthComponent,
    DashboardComponent,
    UserManageComponent,
    OrderManageComponent,
    UserDeleteConfirmComponent,
    UserEditFormComponent,
    SlideDeleteConfirmComponent,
    SlideEditFormComponent,
    SlideManageComponent,
    CartComponent,
    SuccessPaymentComponent,
    FailPaymentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    ProductList,
    FormsModule,
    NgbdRatingTemplate,
    NgbNavModule,
    UserList,
    MatChipsModule,
    ProductSlideComponent,
    MatFormFieldModule,
    MatSelectModule,
    SlideList,
    CheckoutComponent,
    NgbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
