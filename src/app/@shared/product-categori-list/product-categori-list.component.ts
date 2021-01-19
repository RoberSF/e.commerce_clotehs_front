import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import productList from '@data/products.json';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-categori-list',
  templateUrl: './product-categori-list.component.html',
  styleUrls: ['./product-categori-list.component.scss']
})
export class ProductCategoriListComponent implements OnInit {

  @Input() title = 'Título de la categoría';
  @Input() productList: Array<IProduct> = [];
  @Input() description = '';
  @Input() showDesc: boolean;

  constructor(private router: Router, private shoppinCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {
    this.shoppinCartService.manageProduct($event)
  }

  showProductDetails($event: IProduct) {
    this.router.navigate(['/games/details/', $event.id])
  }

}
