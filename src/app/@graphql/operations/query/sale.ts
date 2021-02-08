import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const SALE_LIST_QUERY = gql`

    query sales($page: Int!, $itemsPerPage: Int, $active:ActiveFilterEnum) {

      sales(page: $page, itemsPerPage: $itemsPerPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        sales {
           id
           operationId
           emailAdress
           name
           clientPlatformId
           url
           date
           status
           platform
           totalOperation
           active
           description {
             name
             qty
             price
           }
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
`;

export const SALE_QUERY = gql`

    query sale($id: ID!) {
      sale(id:$id) {
        status
        message
        sale {
           id
           operationId
           emailAdress
           name
           clientPlatformId
           url
           date
           status
           platform
           totalOperation
           active
           description {
             name
             qty
             price
           }
         }
      }
    }
`;

export const SEARCH_SALE_QUERY = gql`
  
  query saleSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    saleSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      sale {
           id
           operationId
           emailAdress
           name
           clientPlatformId
           url
           date
           status
           platform
           totalOperation
           active
           description {
             name
             qty
             price
           }
       }
    }
  }
`