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

export const SEARCH_PRODUCT_QUERY = gql`
  
  query productSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String, $categoriasId: [ID] ) {

    productSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value, categoriasId: $categoriasId){
      status
      message
      products {
        ...ProductObject
      }
    }
  }
  ${ PRODUCT_FRAGMENT }
`
export const PRODUCT_BY_CATEGORIA = gql`
  query productsCategorias($categorias: [ID]) {
      productsCategorias(categorias: $categorias) {
        info {
          ...ResultInfoObject
        }
        products {
        ...ProductObject
      }
        }
      }
    ${ RESULT_INFO_FRAGMENT }
    ${ PRODUCT_FRAGMENT }
`

