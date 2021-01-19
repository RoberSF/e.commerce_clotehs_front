import { Component, OnInit } from '@angular/core';
import { IMeData } from '@shop/core/Interfaces/ISession';
import { AuthService } from 'src/app/services/auth.service';
import shopMenuItems from '@data/menus/shopNavbar.json';
import { IMenuItem } from '@shop/core/Interfaces/IMenuItemNavbar';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { IShoppingCart } from '../../Interfaces/IShoppingCart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  shoppingCartItemsTotal: number;
  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService, private router: Router) {
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data !== undefined && data !== null) {
        this.shoppingCartItemsTotal = data.subtotal
      }
    })
  }

  ngOnInit(): void {
    this.shoppingCartItemsTotal = this.shoppingCartService.initializeCart().subtotal
  }

  async logout() {

        // En caso de encontrarla, marcamos para que redireccione
        this.authService.resetSession(this.router.url);
  }

  openNav() {
    this.shoppingCartService.openNav()
  }

}
