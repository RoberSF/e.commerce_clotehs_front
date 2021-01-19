import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TablePaginationModule } from '../../../@shared/table-pagination/table-pagination.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TablePaginationModule,
    NgbPaginationModule
  ]
})
export class UsersModule { }
