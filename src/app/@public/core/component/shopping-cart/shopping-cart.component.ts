import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { IShoppingCart } from '../../Interfaces/IShoppingCart';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { CURRENCY_SELECTED } from '../../../../@shared/constants/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoopingCart: IShoppingCart;
  currencySelect = CURRENCY_SELECTED;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { 

    // Escuchamos el observable del ShoppingService
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data !== undefined && data !== null) {
        this.shoopingCart = data;
      }
    })
  }

  ngOnInit(){
    this.shoopingCart = this.shoppingCartService.initializeCart()
  }
  // Para borrar todos los elementos
  clear() {
    this.shoppingCartService.clear()
  }
  // Para borrar un elemento
  clearItem(product: IProduct){
    this.manageProductUnitInfo(0, product)
  }

  changeValue(qty: number, product: IProduct) {
    this.manageProductUnitInfo(qty, product)
  }

  manageProductUnitInfo(qty: number, product: IProduct) {
    product.qty = qty;
    this.shoppingCartService.manageProduct(product);
  }

  closeNav() {
    this.shoppingCartService.closeNav()
  }

  toPay() {
    this.router.navigate(['/checkout']);
    this.shoppingCartService.closeNav()
  }


}
