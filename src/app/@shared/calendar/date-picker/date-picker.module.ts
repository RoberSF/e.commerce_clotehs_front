import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
