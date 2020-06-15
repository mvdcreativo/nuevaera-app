import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CartButtonComponent } from './header/cart-button/cart-button.component';
import { MaterialModule } from '../material/material.module';
import { OfersSlidesComponent } from './ofers-slides/ofers-slides.component';
import { AvatarSlidesComponent } from './avatar-slides/avatar-slides.component';
import { BannerSlidesComponent } from './banner-slides/banner-slides.component';
import { BrandsSlidesComponent } from './brand-slides/brands-slides.component';
import { RouterModule } from '@angular/router';
import { MercadopagoWebComponent } from './mercadopago-web/mercadopago-web.component';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    CartButtonComponent,
    OfersSlidesComponent,
    AvatarSlidesComponent,
    BannerSlidesComponent,
    BrandsSlidesComponent,
    MercadopagoWebComponent,
    SkeletonListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    OfersSlidesComponent,
    AvatarSlidesComponent,
    BannerSlidesComponent,
    BrandsSlidesComponent,
    MercadopagoWebComponent,
    SkeletonListComponent

  ]
})
export class ComponentsModule { }
