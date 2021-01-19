import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { MODIFY_COLOR, BLOCK_COLOR, UNBLOCK_COLOR, ADD_COLOR } from '../../@graphql/operations/mutation/color';
import { COLOR_LIST_QUERY } from '@graphql/operations/query/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(color: string) {
  return this.set(ADD_COLOR,{color}, {}).pipe(map( (result: any) => {
      return result.addColor;
    }));
}

update(id: string, color: string) {
  return this.set(
    MODIFY_COLOR,
    {
      id,
      color
    }, {}).pipe(map( (result: any) => {
      return result.updateColor;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_COLOR,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockColor;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_COLOR,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockColor;
    }));
}

colors() {
    return this.get(COLOR_LIST_QUERY,{}, {}).pipe(map( (result: any) => {
        return result.colors;
      }));
}


}