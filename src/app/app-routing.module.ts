import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailsComponent } from './main/account-details/account-details.component';
import { CartDetailsComponent } from './main/cart-details/cart-details.component';
import { ProductDetailsComponent } from './main/product-details/product-details.component';
import { ProductListComponent } from './main/product-list/product-list.component';
import { OrderDetailsComponent } from './main/order-details/order-details.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'products/:id', component: ProductListComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'order-details/:id', component: OrderDetailsComponent},
  {path: 'account-details', component: AccountDetailsComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
