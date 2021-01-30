import { Component, OnInit } from '@angular/core';
import { ILogin } from '@shop/core/Interfaces/IloginForm';
import { AuthService } from '../../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IResultLogin } from '../../../core/Interfaces/IloginForm';
import Swal from 'sweetalert2'
import { IMeData } from '@shop/core/Interfaces/ISession';
import { basicAlert } from '../../../../@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';

declare function init_plugins();//de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
//en cualquier archivo de JSJ,TS

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: ILogin = {
    email: '',
    password: ''
  }
  rememeberme = false;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    // init_plugins();
    this.auth.start();
    this.login.email = localStorage.getItem('email') || '';

    if ( this.login.email.length > 1) {
      this.rememeberme = true
    }
  }

  logIn() {

    this.auth.login(this.login.email, this.login.password).subscribe((result: IResultLogin) => {

      if( this.rememeberme === true) {
        localStorage.setItem('email', this.login.email)
      }

      if( this.rememeberme === false ) {
        localStorage.removeItem('email')
      }

      console.log(result);
      if(result.status) {
        if(result.token !== null) {
          this.auth.saveSession(result.token);
          this.auth.updateSession(result);
          if ( localStorage.getItem('route_after_login')) {
            // comprobamos al hacer login si nos tiene que redireccionar a checkout
            const route = [localStorage.getItem('route_after_login')]
            this.router.navigate(route)
            return
          }
          this.router.navigate(['/home']);
          return
        }
        basicAlert(TYPE_ALERT.WARNING, result.message);
        return
      }
      basicAlert(TYPE_ALERT.INFO, result.message);
    })
    // let usuario: Usuario = new Usuario(null, form.value.email, form.value.password);

    // this.usuarioService.login(usuario, form.value.rememberme).subscribe(response => {
    //   console.log(response);
    //   this.router.navigate(['/dashboard'])
    // })
  }
}
