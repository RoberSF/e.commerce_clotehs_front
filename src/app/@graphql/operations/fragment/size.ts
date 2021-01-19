//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';

export const SIZE_FRAGMENT = gql `

fragment SizeObject on Size {
          id
          name
          slug
          active
}
`


