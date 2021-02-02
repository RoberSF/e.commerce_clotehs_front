import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_CATEGORIA, BLOCK_CATEGORIA, MODIFY_CATEGORIA } from '@graphql/operations/mutation/categoria';
import { UNBLOCK_CATEGORIA } from '../@graphql/operations/mutation/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(categoria: string) {
  return this.set(ADD_CATEGORIA,{categoria}, {}).pipe(map( (result: any) => {
      return result.addCategoria;
    }));
}

update(id: string, categoria: string) {
  return this.set(
    MODIFY_CATEGORIA,
    {
      id,
      categoria
    }, {}).pipe(map( (result: any) => {
      return result.updateCategoria;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_CATEGORIA,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockCategoria;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_CATEGORIA,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockCategoria;
    }));
}


}
