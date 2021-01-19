import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IMeData } from '../../Interfaces/ISession';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  session: IMeData = {
    status: false,
  };
  access = false;
  role: string = '';
  userLabel: string =  ''

  constructor(private auth: AuthService) {
    this.auth.accessVar$.subscribe( (result) => {
      this.session = result;
      this.access = this.session.status;
      //this.role = this.session.user.role;
      this.userLabel = `${ this.session.user?.email }`;
    });
   }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.resetSession();
  }

}
