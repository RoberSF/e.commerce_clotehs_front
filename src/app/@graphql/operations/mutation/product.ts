import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { PRODUCT_FRAGMENT } from '../fragment/product';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_PRODUCT = gql`

mutation addProduct($product: ProductInput!) {
    addProduct(product: $product) {
      status
      message
      product {
          id
          name
          categoria
          description
          size
          color
          photo
          price
          active
          stock
      }
    }
  }
  `;

export const MODIFY_PRODUCT = gql`

mutation updateProduct($id: ID!, $product: ProductInput!) {
    updateProduct(id: $id, product: $product) {
    status
    message
    product {
          name
          categoria
          description
          size
          color
          photo
          price
          active
          stock
          screenshoots
    }
  }
}
  `;

export const BLOCK_PRODUCT = gql`

mutation blockProduct($id: ID!) {
    blockProduct(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_PRODUCT = gql`
mutation unBlockProduct($id: ID!) {
    unBlockProduct(id: $id) {
      status
      message
    }
  }
  `;

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      status
      message
    }
  }
  `;
