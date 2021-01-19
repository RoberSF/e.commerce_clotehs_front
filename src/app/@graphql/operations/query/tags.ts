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