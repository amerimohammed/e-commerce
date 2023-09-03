import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductManageComponent } from './page/manage/product-manage/product-manage.component';
import { ProductComponent } from './page/product/product.component';
import { DashboardComponent } from './page/manage/dashboard/dashboard.component';
import { UserManageComponent } from './page/manage/user-manage/user-manage.component';
import { OrderManageComponent } from './page/manage/order-manage/order-manage.component';
import { isAuthenticatedGuard } from './guard/is-authenticated.guard';
import { hasRoleGuard } from './guard/has-role.guard';
import { SlideManageComponent } from './page/manage/slide-manage/slide-manage.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { SuccessPaymentComponent } from './page/success-payment/success-payment.component';
import { FailPaymentComponent } from './page/fail-payment/fail-payment.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment/success', component: SuccessPaymentComponent },
  { path: 'payment/fail', component: FailPaymentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product/:productId', component: ProductComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_EDITOR'] },
  },
  {
    path: 'manage/product',
    component: ProductManageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_EDITOR'] },
  },
  {
    path: 'manage/user',
    component: UserManageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: { allowedRoles: ['ROLE_ADMIN'] },
  },
  {
    path: 'manage/order',
    component: OrderManageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_EDITOR'] },
  },
  {
    path: 'manage/slide',
    component: SlideManageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_EDITOR'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
