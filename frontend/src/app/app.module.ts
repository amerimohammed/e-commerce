import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
