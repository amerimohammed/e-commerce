import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductManageComponent } from './page/manage/product-manage/product-manage.component';
import { ProductComponent } from './page/product/product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'manage/product', component: ProductManageComponent },
  { path: 'product/:productId', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
