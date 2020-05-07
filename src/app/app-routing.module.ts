import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list', loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'product-detail', loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'data-order',
    loadChildren: () => import('./pages/data-order/data-order.module').then( m => m.DataOrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pago/:idOrder',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'orders-list',
    loadChildren: () => import('./pages/orders-list/orders-list.module').then( m => m.OrdersListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
