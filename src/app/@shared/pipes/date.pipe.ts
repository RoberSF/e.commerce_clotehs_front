import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class DatePipe implements PipeTransform {

  transform(date): any {


    // Ya tengo un pipe propio de angular
    // Aquí haría toda la lógica
    return date;
  }

}
