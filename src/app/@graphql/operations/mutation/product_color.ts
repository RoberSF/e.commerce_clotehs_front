import gql from 'graphql-tag';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_PRODUCT_COLOR = gql`

mutation addProductColor($productColor: ProductColorInput!) {
    addProductColor(productColor: $productColor) {
      status
      message
      product {
        id
      }
    }
  }
  `;

export const DELETE_PRODUCT_COLOR = gql`

mutation deleteProductColor($productId: ID!) {
    deleteProductColor(productId: $productId) {
      status
      message
    }
  }
  `;