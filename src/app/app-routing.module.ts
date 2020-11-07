import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './header/login/login.component';
import { ProductListComponent } from './main/product-list/product-list.component';

const recipesRoutes: Routes = [
  {path: 'login', component: LoginComponent},
];

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
