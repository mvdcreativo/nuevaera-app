import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataOrderPageRoutingModule } from './data-order-routing.module';

import { DataOrderPage } from './data-order.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DataOrderPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [DataOrderPage]
})
export class DataOrderPageModule {}
