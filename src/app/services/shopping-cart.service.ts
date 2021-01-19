import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IShoppingCart } from '../@public/core/Interfaces/IShoppingCart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  products: Array<IProduct> = [];
  shoppingCart: IShoppingCart = {
    total: 0,
    subtotal: 0,
    products: this.products
  };

  // Gestión de productos con las notificaciones cuando se hacen modificaciones
  // Notificamos los cambios con el observable
  public itemsVar = new Subject<IShoppingCart>();
  public itemsVar$ = this.itemsVar.asObservable();


  //**************************************************************************************************
  //       Inicializar el carrito de compra para tener la info giardada                                                           
  //**************************************************************************************************
  
  initializeCart() {
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if ( storeData != null ) {
      this.shoppingCart = storeData;
    }
    return this.shoppingCart;
  }

  public updateItemsInShoppingCart(newValue: IShoppingCart){
    this.itemsVar.next(newValue)
  }

  //**************************************************************************************************
  //       Manejamos los productos para añadirlos al carrito o que se borren  V-409                                                          
  //**************************************************************************************************
  manageProduct(product: IProduct) {
      // Obtener cantidad de productos en el carrito
      const productTotal = this.shoppingCart.products.length;
      // Comprobamos si hay productos
      if (productTotal === 0 ) {
        console.log('Producto Añadido');
        this.shoppingCart.products.push(product)
      } else {
        let actionUpdateOk = false;
        // Si tenemos productos hacer lo siguiente:
        for ( let i = 0; i < productTotal; i++){
          // Comprobar que coincide el product con alguno de la lista
          if ( product.id === this.shoppingCart.products[i].id) {
              console.log('Producto existente');
              if ( product.qty === 0 ) {
                console.log('Borrar item seleccionado');
                //Quitar elemento por que llegó a cero
                this.shoppingCart.products.splice(i, 1);
              } else {
                // Actualizar con la nueva información
                this.shoppingCart.products[i] = product
              }
              actionUpdateOk = true;
              // Invalidamos el for
              i = productTotal;
          }
        }
        if( !actionUpdateOk) {
          this.shoppingCart.products.push(product)
        }
      }
      //localStorage.setItem('cart', JSON.stringify(this.shoppingCart))
      this.checkOutTotal();
  }

  //**************************************************************************************************
  //                     Comprobamos la información para hacer el pago                                                           
  //**************************************************************************************************
  
  checkOutTotal() {
    let subtotal = 0;
    let total = 0;
    this.shoppingCart.products.map((product: IProduct) => { //utiizamos el map para poder recorrer el array
        subtotal += product.qty // subtotal = subtotal + product.qty
        total += (product.qty * product.price);
    })
    this.shoppingCart.total = total;
    this.shoppingCart.subtotal = subtotal;
    console.log('calculado',this.shoppingCart);
    this.setInfo()
  }

//**************************************************************************************************
//                                   Vaciar carrito                                                           
//**************************************************************************************************

  clear() {
    this.products =  [];
    this.shoppingCart  = {
      total: 0,
      subtotal: 0,
      products: this.products
    };
    this.setInfo();
    console.log('Carrito vacío');
    return this.shoppingCart;
  }

//**************************************************************************************************
//                                                                                                   
//**************************************************************************************************

  orderDescription() {
    let description = '';
    this.shoppingCart.products.map( (product: IProduct) => {
      description += `${product.name} (${product.description}) x ${product.qty}/n`
    })
    return description
  }


  private setInfo() {
    console.log('localStorage', this.shoppingCart);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart))
    this.updateItemsInShoppingCart(this.shoppingCart) // notificamos los cambios con el observable
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("app-body").style.overflow = "auto";
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("app-body").style.overflow = "hidden";
  }
}
