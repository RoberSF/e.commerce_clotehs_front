import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { SIZE_FRAGMENT } from '../fragment/size';

export const SIZES_LIST_QUERY = gql`

    query sizes($page: Int, $itemsPage: Int, $active:ActiveFilterEnum) {
      sizes(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        sizes {
          ...SizeObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ SIZE_FRAGMENT }
`;

export const SIZE_QUERY = gql`

    query size($id: ID!) {
      size(id: $id) {
        status
        message
        size {
          ...SizeObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ SIZE_FRAGMENT }
`;

export const SEARCH_SIZE_QUERY = gql`
  
  query sizeSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    sizeSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      sizes {
        ...SizeObject
      }
    }
  }
  ${ SIZE_FRAGMENT }
`