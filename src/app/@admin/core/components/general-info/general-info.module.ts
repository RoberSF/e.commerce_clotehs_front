import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoRoutingModule } from './general-info-routing.module';
import { GeneralInfoComponent } from './general-info.component';


@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    GeneralInfoRoutingModule
  ],
  exports: [GeneralInfoComponent]
})
export class GeneralInfoModule { }
