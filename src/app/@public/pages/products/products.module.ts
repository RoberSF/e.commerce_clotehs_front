import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCategoriListModule } from 'src/app/@shared/product-categori-list/product-categori-list.module';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarModule } from 'src/app/@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductCategoriListModule,
    FormsModule,
    NgbPaginationModule,
    SearchBarModule,
  ]
})
export class ProductsModule { }
