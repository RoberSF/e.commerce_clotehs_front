import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { ApiService } from '../../@graphql/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo)
}



}
