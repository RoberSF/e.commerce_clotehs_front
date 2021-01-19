import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_PRODUCT, MODIFY_PRODUCT, BLOCK_PRODUCT, UNBLOCK_PRODUCT } from '../@graphql/operations/mutation/product';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';


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












}
