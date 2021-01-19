import { Component, OnInit } from '@angular/core';
import { CURRENCY_CODE, CURRENCY_SELECTED } from '../../../../../@shared/constants/config';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { IShoppingCart } from '../../../../core/Interfaces/IShoppingCart';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss']
})
export class CheckoutResumeComponent implements OnInit {

currencySelected= CURRENCY_SELECTED;
currencyCode = CURRENCY_CODE;
shoppingCart: IShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data !== undefined && data !== null) {
        this.shoppingCart = data;
      }
    })
   }


  ngOnInit() {
    this.shoppingCart = this.shoppingCartService.initializeCart();
  }

}
