

//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';

export const PAYMENT_FRAGMENT = gql `

fragment ChargeObject on StripeCharge {
    id
    description
    card
    paid
    customer
    created
    amount
    status
    receiptUrl
    receiptEmail 
    typeOrder
}
`