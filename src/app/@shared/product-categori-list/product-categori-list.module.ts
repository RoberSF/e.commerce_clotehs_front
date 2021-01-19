import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoriListRoutingModule } from './product-categori-list-routing.module';
import { ProductCategoriListComponent } from './product-categori-list.component';
import { ProductItemModule } from '@mugan86/ng-shop-ui';


@NgModule({
  declarations: [ProductCategoriListComponent],
  imports: [
    CommonModule,
    ProductCategoriListRoutingModule,
    ProductItemModule
  ],
  exports: [ProductCategoriListComponent],
})
export class ProductCategoriListModule { }
