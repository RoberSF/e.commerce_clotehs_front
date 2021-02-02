import gql from 'graphql-tag';
import { CATEGORIA_FRAGMENT } from '../fragment/categoria';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_CATEGORIA = gql`

mutation addCategoria($categoria: String!) {
    addCategoria(categoria: $categoria) {
      status
      message
      categoria {
        ...CategoriaObject
      }
    }
  }
  ${CATEGORIA_FRAGMENT}
  `;



//**************************************************************************************************
//              Método de actualizar género de la api de graphql                                                          
//**************************************************************************************************

export const MODIFY_CATEGORIA = gql`

mutation updateCategoria($id: ID!, $categoria: String!) {
  updateCategoria(id: $id, categoria: $categoria) {
    status
    message
    categoria {
      ...CategoriaObject
    }
  }
}
  ${CATEGORIA_FRAGMENT}
  `;
  

//**************************************************************************************************
//                 Método de bloquear género de la api de graphql                                                           
//**************************************************************************************************

export const BLOCK_CATEGORIA = gql`

mutation blockCategoria($id: ID!) {
    blockCategoria(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_CATEGORIA = gql`
mutation unBlockCategoria($id: ID!) {
    unBlockCategoria(id: $id) {
      status
      message
    }
  }
  `;
