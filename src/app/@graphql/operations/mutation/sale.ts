import gql from 'graphql-tag';

//**************************************************************************************************
//                    Método de añadir post de la api graphql                                                           
//**************************************************************************************************

export const ADD_SALE = gql`

    mutation addSale($sale: SaleInput!) {
        addSale(sale: $sale) {
          status
          message
          sale {
            operationId
            emailAdress
            name
            clientPlatformId
            url
            date
            status
            platform
            totalOperation
            active
            description {
              name
              qty
              price
            }
          }
        }
      }
`;



//**************************************************************************************************
//              Método de actualizar venta de la api de graphql                                                          
//**************************************************************************************************

export const MODIFY_SALE = gql`

mutation updateSale($id: ID!, $sale: SaleInput!) {
  updateSale(id: $id, sale: $sale) {
    status
    message
    sale {
       id
       operationId
       emailAdress
       name
       clientPlatformId
       url
       date
       status
       platform
       totalOperation
       active
      }
  }
}
  `;
  

//**************************************************************************************************
//                 Método de bloquear post de la api de graphql                                                           
//**************************************************************************************************

export const BLOCK_SALE = gql`

mutation blockSale($id: ID!) {
    blockSale(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_SALE = gql`
mutation unBlockSale($id: ID!) {
    unBlockSale(id: $id) {
      status
      message
    }
  }
  `;

