import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { TAG_FRAGMENT } from '../fragment/tag';





//**************************************************************************************************
//                    Método de añadir post de la api graphql                                                           
//**************************************************************************************************

export const ADD_POST = gql`

mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      info
      status
      message
      post {
        id
        title
        intro
        contenido
        categoria
        img
      }
    }
  }
  `;



//**************************************************************************************************
//              Método de actualizar post de la api de graphql                                                          
//**************************************************************************************************

export const MODIFY_POST = gql`

mutation updatePost($id: ID!, $post: PostInput!) {
  updatePost(id: $id, post: $post) {
    status
    message
    post {
        id
        title
        intro
        contenido
        categoria
        img
      }
  }
}
  `;
  

//**************************************************************************************************
//                 Método de bloquear post de la api de graphql                                                           
//**************************************************************************************************

export const BLOCK_POST = gql`

mutation blockPost($id: ID!) {
    blockPost(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_POST = gql`
mutation unBlockPost($id: ID!) {
    unBlockPost(id: $id) {
      status
      message
    }
  }
  `;

export const DELETE_POST = gql`
mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      status
      message
    }
  }
  `;
