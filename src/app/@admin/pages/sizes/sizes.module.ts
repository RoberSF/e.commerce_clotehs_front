import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizesRoutingModule } from './sizes-routing.module';
import { SizesComponent } from './sizes.component';
import { TablePaginationModule } from '../../../@shared/table-pagination/table-pagination.module';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [SizesComponent],
  imports: [
    CommonModule,
    SizesRoutingModule,
    TablePaginationModule,
    SearchBarModule
  ]
})
export class SizesModule { }
