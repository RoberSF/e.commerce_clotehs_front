import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { TAG_FRAGMENT } from '../fragment/tag';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_TAG = gql`

mutation addTag($tag: String!) {
    addTag(tag: $tag) {
      status
      message
      tag {
        ...TagObject
      }
    }
  }
  ${TAG_FRAGMENT}
  `;



//**************************************************************************************************
//              Método de actualizar género de la api de graphql                                                          
//**************************************************************************************************

export const MODIFY_TAG = gql`

mutation updateTag($id: ID!, $tag: String!) {
  updateTag(id: $id, tag: $tag) {
    status
    message
    tag {
      ...TagObject
    }
  }
}
  ${TAG_FRAGMENT}
  `;
  

//**************************************************************************************************
//                 Método de bloquear género de la api de graphql                                                           
//**************************************************************************************************

export const BLOCK_TAG = gql`

mutation blockTag($id: ID!) {
    blockTag(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_TAG = gql`
mutation unBlockTag($id: ID!) {
    unBlockTag(id: $id) {
      status
      message
    }
  }
  `;
