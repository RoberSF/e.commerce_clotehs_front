import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { PRODUCT_FRAGMENT } from '../fragment/product';
import { SIZE_FRAGMENT } from '../fragment/size';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_SIZE = gql`

mutation addSize($size: SizeInput!) {
    addSize(size: $size) {
      status
      message
      size {
        ...SizeObject
      }
    }
  }
  ${SIZE_FRAGMENT}
  `;

export const MODIFY_SIZE = gql`

mutation updateSize($id: ID!, $size: SizeInput!) {
    updateSize(id: $id, size: $size) {
    status
    message
    size {
      ...SizeObject
    }
  }
}
${SIZE_FRAGMENT}
  `;

export const BLOCK_SIZE = gql`

mutation blockSize($id: ID!) {
    blockSize(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_SIZE = gql`
mutation unBlockSize($id: ID!) {
    unBlockSize(id: $id) {
      status
      message
    }
  }
  `;
