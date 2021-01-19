import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  

  // Enviamos la fecha al componente hijo
  @Output() newDate = new EventEmitter<NgbDateStruct>();

  CURRENTDAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  minDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 100,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day
  };
  maxDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 18,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day
  };

  model: NgbDateStruct = this.maxDate;

  constructor() { }

  ngOnInit(): void {
  }

  selectDateChange() {
    console.log(this.model);
    this.newDate.emit(this.model);
  }

}
