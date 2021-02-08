import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { TablePaginationModule } from 'src/app/@shared/table-pagination/table-pagination.module';
import { SearchBarModule } from 'src/app/@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    TablePaginationModule,
    SearchBarModule,
  ]
})
export class SalesModule { }
