import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_GENRE, BLOCK_GENRE, MODIFY_GENRE, UNBLOCK_GENRE } from '@graphql/operations/mutation/genre';
import { ADD_TAG, BLOCK_TAG, MODIFY_TAG, UNBLOCK_TAG } from '@graphql/operations/mutation/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(tag: string) {
  return this.set(ADD_TAG,{tag}, {}).pipe(map( (result: any) => {
      return result.addTag;
    }));
}

update(id: string, tag: string) {
  return this.set(
    MODIFY_TAG,
    {
      id,
      tag
    }, {}).pipe(map( (result: any) => {
      return result.updateTag;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_TAG,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockTag;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_TAG,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockTag;
    }));
}


}
