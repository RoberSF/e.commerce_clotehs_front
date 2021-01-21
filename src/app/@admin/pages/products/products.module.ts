import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { TablePaginationModule } from 'src/app/@shared/table-pagination/table-pagination.module';
import { FormsModule } from '@angular/forms';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TablePaginationModule,
    FormsModule,
    SearchBarModule
  ]
})
export class ProductsModule { }
