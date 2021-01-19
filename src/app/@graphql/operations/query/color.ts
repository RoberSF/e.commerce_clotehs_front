import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { COLOR_FRAGMENT } from '../fragment/color';


export const COLOR_LIST_QUERY = gql`

    query colors($page: Int, $itemsPage: Int, $active:ActiveFilterEnum) {
      colors(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        colors {
          ...ColorObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ COLOR_FRAGMENT }
`;

export const COLOR_QUERY = gql`

    query color($id: ID!) {
      color(id: $id) {
        status
        message
        color {
          ...ColorObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ COLOR_FRAGMENT }
`;