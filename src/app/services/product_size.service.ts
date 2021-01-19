import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_SIZE, MODIFY_SIZE, BLOCK_SIZE, UNBLOCK_SIZE } from '../@graphql/operations/mutation/size';
import { SIZES_LIST_QUERY } from '../@graphql/operations/query/size';
import { ADD_PRODUCT_SIZE } from '@graphql/operations/mutation/product_size';
import { IProductSize } from '../@admin/core/interfaces/IProductSize';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(productSize: IProductSize) {
  return this.set(ADD_PRODUCT_SIZE,{productSize}, {}).pipe(map( (result: any) => {
      return result.addProductSize;
    }));
}



}
