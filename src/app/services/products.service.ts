import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_PRODUCT, MODIFY_PRODUCT, BLOCK_PRODUCT, UNBLOCK_PRODUCT, DELETE_PRODUCT } from '../@graphql/operations/mutation/product';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { HOME_PAGE } from '@graphql/operations/query/homePage';
import { ACTIVE_FILTERS } from '../@shared/constants/filter';
import { SEARCH_PRODUCTO_PLATFORM } from '@graphql/operations/query/search';
import { PRODUCT_BY_CATEGORIA, PRODUCT_DETAILS } from '@graphql/operations/query/product';
import { DocumentNode } from 'graphql';


@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

add(product: IProduct) {
  return this.set(ADD_PRODUCT,{product}, {}).pipe(map( (result: any) => {
      return result.addProduct;
    }));
}

update(id: string, product: IProduct) {
  return this.set(
    MODIFY_PRODUCT,
    {
      id,
      product
    }, {}).pipe(map( (result: any) => {
      return result.updateProduct;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_PRODUCT,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockProduct;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_PRODUCT,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockProduct;
    }));
}

delete(id: string) {
  return this.set(DELETE_PRODUCT,{id}, {}).pipe(map( (result: any) => {
      return result.deleteProduct;
    }));
}

getHomePage() {
  return this.get(HOME_PAGE).pipe(map( (result:any) => {
      return {
        carousel: result.carousel.products,
        topPrice: this.manageInfo(result.topPrice35.products)
      };
  }))
}

private manageInfo(listProducts) {
  const resultList: Array<IProduct> = [];
  listProducts.map( (productObject: IProduct) => {
    resultList.push( this.setInObject(productObject))
  })
  return resultList;
}

private setInObject(productObject) {
  return {
    // Tener en cuenta la interfaceIProduct
    id: productObject.id,
    img: productObject.img,
    name: productObject.name,
    description: productObject.description,
    qty: 1,
    price: productObject.price,
    active: productObject.active,
    stock: productObject.stock
  };
}


getByCategoria(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, categorias: Array<string>) {
  return this.get(PRODUCT_BY_CATEGORIA, { page, itemsPage, active, categorias }).pipe(map((result: any) => {
    const data = result.productsCategorias
    return {
      info: data.info,
      result: this.manageInfo(data.products)
    }

  }));
}

searchProductsByCategorias(query: DocumentNode, variables: object = {} , context: object = {}) {
  return this.get(query,variables,context)
}

stockUpdateListener(id: number) {
  // return this.subscription(SUBSCRIPTIONS_PRODUCT_SELECT_STOCK, { id }).pipe(map( (result: any) => {
  //   return result.selectProductStockUpdate
  // }));
}


getItem(id: number) {

  return this.get( PRODUCT_DETAILS, { id: id}, {}, false).pipe(map( (result: any) => {
    const data =  result.productDetails;
    return {
      product: this.setInObject(data.product),
      screenshoots: data.product.screenshoots, //ojo al doble product que es a causa del fragment
    } 
  }))

}











}
