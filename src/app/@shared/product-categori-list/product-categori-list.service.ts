import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { ApiService } from '../../@graphql/services/api.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriListService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo)
}

}