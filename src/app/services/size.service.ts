import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_SIZE, MODIFY_SIZE, BLOCK_SIZE, UNBLOCK_SIZE } from '../@graphql/operations/mutation/size';
import { SIZES_LIST_QUERY } from '../@graphql/operations/query/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(size: string) {
  return this.set(ADD_SIZE,{size}, {}).pipe(map( (result: any) => {
      return result.addSize;
    }));
}

update(id: string, size: string) {
  return this.set(
    MODIFY_SIZE,
    {
      id,
      size
    }, {}).pipe(map( (result: any) => {
      return result.updateSize;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_SIZE,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockSize;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_SIZE,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockSize;
    }));
}

sizes() {
    return this.get(SIZES_LIST_QUERY,{}, {}).pipe(map( (result: any) => {
        return result.sizes;
      }));
}


}
