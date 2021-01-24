import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { COLORS_LIST_QUERY } from '@graphql/operations/query/color';
import { ADD_COLOR, DELETE_COLOR, MODIFY_COLOR, UNBLOCK_COLOR } from '@graphql/operations/mutation/color';
import { BLOCK_COLOR, SINGLE_UPLOAD } from '../@graphql/operations/mutation/color';
import { IColor } from '@admin/core/interfaces/IColor';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(color: IColor) {
  return this.set(ADD_COLOR,{color}, {}).pipe(map( (result: any) => {
      return result.addColor;
    }));
}

update(id: string, color: IColor) {
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
    return this.get(COLORS_LIST_QUERY,{}, {}).pipe(map( (result: any) => {
        return result.colors;
      }));
}

delete(id: string) {
  return this.set(DELETE_COLOR, {id}, {}).pipe(map( (result: any) => {
    return result.deleteColor;
  }));
}

upload(file) {
  console.log(file);
  return this.set(SINGLE_UPLOAD, {file}, { useMultiPart: true})
}

}
