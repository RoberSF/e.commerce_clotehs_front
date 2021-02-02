import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { loadData } from 'src/app/@shared/alerts/alerts';
import { closeAlert } from '../../../../@shared/alerts/alerts';
import { CURRENCY_SELECTED } from '../../../../@shared/constants/config';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { IShoppingCart } from '../../../core/Interfaces/IShoppingCart';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product: IProduct;
  selectImage:string;
  currencySelect = CURRENCY_SELECTED
  screenshoots = [];
  similarProducts: Array<any> = [];
  randomItems: Array<any> = [];
  loading:boolean;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
                private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.loadDataValue(+params.id)
      this.listenerStock(+params.id)
      loadData('Loading', `<div class="lds-roller"><div>`);
      this.loading = true
      // this.productService.itemsRandom().subscribe( result => {
      //   this.randomItems = result
      // })
    })

    // Comprobamos la cantidad del carrito con la cantidad seleccionada del item
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data.subtotal === 0) {
        // Si el carrito está vacío la cantidad será 1
        this.product.qty = 1;
        return;
      }
      this.product.qty = this.findProduct(+this.product.id).qty
    })

  }

  findProduct(id: number) {
    return this.shoppingCartService.shoppingCart.products.find( item => +item.id ===id)
    
  }

  changeValue(qty: number) {
      this.product.qty = qty
  }

  selectImg(i) {
    this.selectImage = this.screenshoots[i] //con el i lo que hago es pasarle la posición del Array
  }

  otherPlatform($event){
    const id = +$event.target.value
    this.loadDataValue(id)
    //**************************************************************************************************************************
    //    Esto lo hacemos por que al cambiar de categorias en details, la url no se cambia, es decir, seguiría el id
    //      del producto pero con la plataforma anterior. Como consecuencia no nos valdría el path para hacer consultas. Ahora sí                                                             
    //**************************************************************************************************************************
    window.history.replaceState( {}, '', `/#/products/details/${id}`)
  }


  loadDataValue(id: number) {
      // this.productService.getItem(id).subscribe( (result:any) => { //el "+" es para pasar a tipo number
      // this.product = result.product;
      // const sameProductInCart = this.findProduct(+this.product.id);
      // this.product.qty = (sameProductInCart !== undefined) ? sameProductInCart.qty : this.product.qty;
      // this.selectImage = this.product.img;
      // this.screenshoots = result.screenshoots;
      // this.similarProducts = result.similarProducts;
      // this.loading = false
      // closeAlert();
      // })
  }

  itemDetail(id: number) {
    this.router.navigate(['/products/details/', id])
  }

  addToCart() {
    this.shoppingCartService.manageProduct(this.product)
  }

  listenerStock(id: number) {
    this.productService.stockUpdateListener(id).subscribe( (result: any) => {
      this.product.stock = result.stock

      //Comprobar que el qty no sea mayor que el stock una vez escuchado el listener
      if ( this.product.qty > this.product.stock ) {
        this.product.qty = this.product.stock
       }
      if (this.product.stock === 0) {
        this.product.qty = 1
      }
        
    })


  }



}

