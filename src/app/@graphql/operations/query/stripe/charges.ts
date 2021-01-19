import gql from 'graphql-tag';
import { PAYMENT_FRAGMENT } from '../../fragment/charges';



//**************************************************************************************************
//                            Forma de hacer las querys a graphql                                                           
//**************************************************************************************************

export const CHARGES_CUSTOMER_LIST_QUERY = gql`
    
    query pagosPorCliente($customer: ID! , $limit: Int, $startingAfter: ID, $endingBefore: ID) {
      chargesByCustomer(customer: $customer, limit: $limit, startingAfter: $startingAfter, endingBefore: $endingBefore ) {
        status
        message
        hasMore
        charges {
            ...ChargeObject
        }
  }
}
${ PAYMENT_FRAGMENT }
  `;







