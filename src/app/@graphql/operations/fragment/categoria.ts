import gql from 'graphql-tag';


export const CATEGORIA_FRAGMENT = gql`

  fragment CategoriaObject on Categoria {
    id
    name
    slug
    active
  }

`;