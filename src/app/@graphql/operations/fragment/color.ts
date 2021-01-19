import gql from 'graphql-tag';


export const COLOR_FRAGMENT = gql`

  fragment ColorObject on Color {
    id
    name
    slug
    active
  }

`;