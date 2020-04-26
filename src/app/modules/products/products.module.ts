import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ListProductComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ListProductComponent
  ]
})
export class ProductsModule { }
