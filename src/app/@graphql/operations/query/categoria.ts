import gql from 'graphql-tag';
import { CATEGORIA_FRAGMENT } from '../fragment/categoria';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';
import { TAG_FRAGMENT } from '../fragment/tag';

export const CATEGORIAS_LIST_QUERY = gql`

    query categorias($page: Int!, $itemsPage: Int, $active:ActiveFilterEnum) {
        categorias(page: $page, itemsPerPage: $itemsPage, active: $active) {
        info {
          ...ResultInfoObject
        }
        status
        message
        categorias {
          ...CategoriaObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ CATEGORIA_FRAGMENT }
`;

export const SEARCH_CATEGORIA_QUERY = gql`
  
  query categoriaSearch($page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum, $value: String ) {

    categoriaSearch(page: $page,itemsPerPage: $itemsPerPage, active:$active, value:$value){
      status
      message
      categorias {
        ...CategoriaObject
      }
    }
  }
  ${ CATEGORIA_FRAGMENT }
`