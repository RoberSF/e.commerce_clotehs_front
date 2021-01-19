import { Component, OnInit } from '@angular/core';
import { IRegisterForm } from '@shop/core/Interfaces/IRegister';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import Swal from 'sweetalert2';
import { IResultRegister } from '../../../core/Interfaces/IRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: IRegisterForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthday: ''
  };
  
  constructor(private router: Router, private usersService: UsersService ) { }

  ngOnInit(): void {
     const data = new Date();
     data.setFullYear(data.getFullYear() - 18);
     this.register.birthday = (data.toISOString()).substring(0, 10); // con substring coortmos el string 
    // console.log(this.register);
  }

  // Clase 178
  private formatNumbers(num: number | string ) {
    return (+num < 10) ? `0${num}` : num;
  }

  dataAsign($event) {
    console.log('register cogiendo dato', $event);
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    this.register.birthday = fecha;
  }

  
  add() {
     console.log('Enviando datos', this.register);
     this.usersService.register(this.register).subscribe((result: IResultRegister) => {
       console.log('Result', result);
       if (!result.status) {
        Swal.fire({
          title: 'Registro incorecto',
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
       }
       Swal.fire({
        title: 'Registro corecto',
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
       this.router.navigate(['/login']);

     });
  }

}
