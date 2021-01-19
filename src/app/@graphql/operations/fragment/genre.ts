
//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';


export const GENRE_FRAGMENT = gql`

  fragment GenreObject on Genre {
    id
    name
    slug
    active
  }

`;
