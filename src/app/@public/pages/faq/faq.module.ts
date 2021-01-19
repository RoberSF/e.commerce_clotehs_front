import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from '../../core/component/component.module';


@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    NgbAccordionModule,
  ]
})
export class FaqModule { }
