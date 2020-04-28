import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductsModule } from 'src/app/modules/products/products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    ComponentsModule,
    ProductsModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
