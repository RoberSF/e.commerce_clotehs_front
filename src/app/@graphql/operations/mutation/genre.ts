import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_GENRE = gql`

mutation addGenre($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
  `;



//**************************************************************************************************
//              Método de actualizar género de la api de graphql                                                          
//**************************************************************************************************

export const MODIFY_GENRE = gql`

mutation updateGenre($id: ID!, $genre: String!) {
  updateGenre(id: $id, genre: $genre) {
    status
    message
    genre {
      ...GenreObject
    }
  }
}
  ${GENRE_FRAGMENT}
  `;
  

//**************************************************************************************************
//                 Método de bloquear género de la api de graphql                                                           
//**************************************************************************************************

export const BLOCK_GENRE = gql`

mutation blockGenre($id: ID!) {
  blockGenre(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_GENRE = gql`
mutation unBlockGenre($id: ID!) {
  unBlockGenre(id: $id) {
      status
      message
    }
  }
  `;
