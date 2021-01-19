import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { PRODUCT_FRAGMENT } from '../fragment/product';

export const PRODUCT_LIST_QUERY = gql`

    query products($page: Int!, $itemsPage: Int, $active:ActiveFilterEnum) {
      products(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        products {
          ...ProductObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ PRODUCT_FRAGMENT }
`;


