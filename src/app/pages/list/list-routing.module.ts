import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';

const routes: Routes = [
      // { path : '', redirectTo: 'productos' , pathMatch: 'full'},
      { path: ':category/:marca', component: ListPage },
      { path: ':category', component: ListPage },
      { path: '', component: ListPage },
      // { path: 'producto/:slug', component: ProductDetailsComponent },
    ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
