import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const POST_LIST_QUERY = gql`

    query posts($page: Int!, $itemsPage: Int, $active:ActiveFilterEnum) {
      posts(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
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
        contenido
        categoria
        img
      }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
`;