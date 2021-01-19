import gql from 'graphql-tag';
import { PAYMENT_FRAGMENT } from '../../fragment/charges';



export const STRIPE_PAYMENT = gql` 

mutation pagarPedido($payment: ChargeInput!, $stockChange: [ProductStockInput!]!) {
    chargeOrder(payment: $payment, stockChange: $stockChange) {
      status
      message
      charge {
        ...ChargeObject
      }
    }
  }
  ${PAYMENT_FRAGMENT}
  `;





