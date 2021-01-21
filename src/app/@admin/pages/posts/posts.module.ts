import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SearchBarModule } from '../../../@shared/search-bar/search-bar.module';
import { TablePaginationModule } from '../../../@shared/table-pagination/table-pagination.module';


@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SearchBarModule,
    TablePaginationModule
  ]
})
export class PostsModule { }
