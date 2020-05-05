import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataOrderPage } from './data-order.page';

const routes: Routes = [
  {
    path: '',
    component: DataOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataOrderPageRoutingModule {}
