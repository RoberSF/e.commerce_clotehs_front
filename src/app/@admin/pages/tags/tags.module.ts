import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { TablePaginationModule } from 'src/app/@shared/table-pagination/table-pagination.module';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';


@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    TablePaginationModule,
    SearchBarModule
  ]
})
export class TagsModule { }
