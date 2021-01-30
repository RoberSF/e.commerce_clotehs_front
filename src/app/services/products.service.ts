import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_PRODUCT, MODIFY_PRODUCT, BLOCK_PRODUCT, UNBLOCK_PRODUCT, DELETE_PRODUCT } from '../@graphql/operations/mutation/product';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { HOME_PAGE } from '@graphql/operations/query/homePage';


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
    active: productObject.active
  };
}












}
