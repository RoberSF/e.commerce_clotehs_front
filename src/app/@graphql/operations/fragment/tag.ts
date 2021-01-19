
//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';


export const TAG_FRAGMENT = gql`

  fragment TagObject on Tag {
    id
    name
    slug
    active
  }

`;