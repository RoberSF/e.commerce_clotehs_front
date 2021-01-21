import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { TAG_FRAGMENT } from '../fragment/tag';

export const TAGS_LIST_QUERY = gql`

    query tags($page: Int!, $itemsPage: Int, $active:ActiveFilterEnum) {
      tags(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        tags {
          ...TagObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ TAG_FRAGMENT }
`;

export const SEARCH_TAG_QUERY = gql`
  
  query tagSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    tagSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      tags {
        ...TagObject
      }
    }
  }
  ${ TAG_FRAGMENT }
`