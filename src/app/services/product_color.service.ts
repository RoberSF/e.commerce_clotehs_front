import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { IProductColor } from '@admin/core/interfaces/IProductColor';
import { ADD_PRODUCT_COLOR } from '@graphql/operations/mutation/product_color';
import { DELETE_PRODUCT_COLOR } from '../@graphql/operations/mutation/product_color';

@Injectable({
  providedIn: 'root'
})
export class ProductColorService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(productColor: IProductColor) {
  return this.set(ADD_PRODUCT_COLOR,{productColor}, {}).pipe(map( (result: any) => {
      return result.addProductColor;
    }));
}

delete(productId: string) {
  return this.set(DELETE_PRODUCT_COLOR, {productId}, {}).pipe(map( (result:any) => {
    return result.deleteProductColor
  }))
}



}