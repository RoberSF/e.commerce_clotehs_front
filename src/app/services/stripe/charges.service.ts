import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { IPayment } from '../../@public/core/Interfaces/stripe/IStripeDescription';
import { STRIPE_PAYMENT } from '../../@graphql/operations/mutation/stripe/charges';
import { map } from 'rxjs/internal/operators/map';
import { CHARGES_CUSTOMER_LIST_QUERY } from '@graphql/operations/query/stripe/charges';
import { IStock } from '@shop/core/Interfaces/IStock';

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

pay(payment: IPayment, stockChange: Array<IStock>) {
    return this.set(STRIPE_PAYMENT, {payment, stockChange}).pipe(map( (result: any) => {
            return result.chargeOrder
    }))
}

chargesListByCustomer(customer: string, limit: number, startingAfter: string, endingBefore: string) {
  return this.get(CHARGES_CUSTOMER_LIST_QUERY, {customer, limit, startingAfter, endingBefore}).pipe(map( (result: any) => {
    return result.chargesByCustomer
  }))
}

}

