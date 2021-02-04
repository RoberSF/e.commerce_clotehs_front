import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMeData } from '@shop/core/Interfaces/ISession';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  session: IMeData = {
    status: false
  };
  access = false;

  constructor(private authService: AuthService,private router: Router) { 

    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
    });
  }

  ngOnInit(): void {
  }

  async logout() {

    // En caso de encontrarla, marcamos para que redireccione
    this.authService.resetSession(this.router.url);
}


}
