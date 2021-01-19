import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IMeData } from '@shop/core/Interfaces/ISession';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggledValue = true;
  session: IMeData = {
    status: false
  };
  userLabel: string;
  role: string;
  access: string;
  @Output() toggleChange = new EventEmitter<boolean>();



  constructor( private authService: AuthService, private router: Router) {

    this.authService.accessVar$.subscribe((result) => {
      if(!result.status) {
        this.router.navigate(['/'])
        return
      }
      this.role = result.user?.role;
      this.userLabel = `${ result.user?.name } ${ result.user?.lastname }`;
    });
  }

  ngOnInit() {
    this.authService.start();
  }

  toggled() {
    if (this.toggledValue === undefined) { //lo hacemos simplemente como validación aun que siempre tendrá un valor
      this.toggledValue = true;
    }
    this.toggledValue = !this.toggledValue; // Es la manera de asignarle el valor contrario al valor que ya tiene
    console.log(this.toggledValue);
    this.toggleChange.emit(this.toggledValue);
  }

  async logout() {

    this.authService.resetSession();
  }
}
