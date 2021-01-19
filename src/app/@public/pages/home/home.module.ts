import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselItemsModule } from '@mugan86/ng-shop-ui';
import { ProductCategoriListModule } from '../../../@shared/product-categori-list/product-categori-list.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselItemsModule,
    ProductCategoriListModule,
  ]
})
export class HomeModule { }
