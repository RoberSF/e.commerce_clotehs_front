import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const POST_LIST_QUERY = gql`

    query posts($page: Int!, $itemsPerPage: Int, $active:ActiveFilterEnum) {
      posts(page: $page, itemsPerPage: $itemsPerPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        posts {
          id
          title
          intro
          contenido
          categoria
          author
          img
          date
          active
      }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
`;

export const POST_QUERY = gql`

    query post($id: ID!) {
      post(id:$id) {
        status
        message
        post {
          id
          title
          intro
          author
          contenido
          categoria
          date
          img
      }
      }
    }
`;

export const SEARCH_POST_QUERY = gql`
  
  query postSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    postSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      posts {
        id
          title
          intro
          author
          contenido
          categoria
          date
          img
      }
    }
  }
`