import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { TablePaginationModule } from '../../../@shared/table-pagination/table-pagination.module';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    TablePaginationModule,
    SearchBarModule,
    FormsModule,

  ]
})
export class ColorsModule { }
