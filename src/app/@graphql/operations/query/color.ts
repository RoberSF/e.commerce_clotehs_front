import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { COLOR_FRAGMENT } from '../fragment/color';


export const COLORS_LIST_QUERY = gql`

    query colors($page: Int, $itemsPerPage: Int, $active:ActiveFilterEnum) {
      colors(page: $page, itemsPerPage: $itemsPerPage, active: $active) {
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
    ${ COLOR_FRAGMENT }
`;

export const SEARCH_COLOR_QUERY = gql`
  
  query colorSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    colorSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      colors {
        ...ColorObject
      }
    }
  }
  ${ COLOR_FRAGMENT }
`