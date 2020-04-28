import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductsModule } from 'src/app/modules/products/products.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    ComponentsModule,
    ProductsModule,
    MaterialModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
