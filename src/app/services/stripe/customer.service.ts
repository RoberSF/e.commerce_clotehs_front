import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { CREATE_CUSTOMER } from '@graphql/operations/mutation/stripe/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

createClientStripe(name: string, email: string) {
    return this.set(
      CREATE_CUSTOMER,
      { name, email}
    ).pipe(map( (result:any) => {
      return result.createCustomer;
    }))
}





}
