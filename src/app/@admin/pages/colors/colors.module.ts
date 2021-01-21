import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { TablePaginationModule } from '../../../@shared/table-pagination/table-pagination.module';
import { SearchBarComponent } from 'src/app/@shared/search-bar/search-bar.component';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    TablePaginationModule,
    SearchBarModule
  ]
})
export class ColorsModule { }
