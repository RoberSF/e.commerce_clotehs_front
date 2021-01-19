import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { UsersService } from 'src/app/services/users.service';
import { basicAlert } from '../../../../@shared/alerts/toasts';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  token: string;
  values:any = {
    password: '',
    passwordTwo: '',
    birthday: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, public userService: UsersService) { 
    this.route.params.subscribe( params => {
      this.token = params.token
      console.log(this.token);
    })
  }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.values.birthday = (data.toISOString()).substring(0, 10);
    console.log(this.values);
  }
  private formatNumbers(num: number | string ) {
    return (+num < 10) ? `0${num}` : num;
  }
  dataAsign($event) {
    console.log('Activar cogiendo dato', $event);
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    console.log(fecha);
    this.values.birthday = fecha;
  }

  add() {
    if(this.values.password !== this.values.passwordTwo) {
      basicAlert(TYPE_ALERT.WARNING, 'Las contraseñas no coinciden')
      return
    }

    this.userService.active(this.token, this.values.birthday, this.values.password).subscribe(
      (result: any) => {
        console.log(result);

        if(result.status) {
          basicAlert(TYPE_ALERT.SUCCESS, result.message)
          return
        }
        basicAlert(TYPE_ALERT.WARNING, result.message)
        this.router.navigate(['/login']); //el nombre del path
        return
      }
    );
  


  }





}
