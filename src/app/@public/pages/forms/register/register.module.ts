import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { DatePickerModule } from '../../../../@shared/calendar/date-picker/date-picker.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    DatePickerModule,
    FormsModule,
  ]
})
export class RegisterModule { }
