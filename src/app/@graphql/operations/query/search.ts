import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';


//**************************************************************************************************
//    Forma de hacer las querys a graphql                                                           
//**************************************************************************************************

export const SEARCH_PRODUCTO_PLATFORM = gql`

query busquedaJuegos($page: Int, $itemsPage: Int, $active:ActiveFilterEnum, $platform: [ID!]!, $searchValue: String!) {
      productsPlatformsSearch(page: $page, itemsPerPage: $itemsPage, active: $active,platform:$platform , searchValue:$searchValue  ) {
        status
        message
        products {
          id
          price
          stock
          active
          productId
          product {
            id
            name
            slug
            img
            rating{ value count }
            screenshoot  
          },
          platform {
            id
            name
            slug
            active
              },
        }
      }
    }
  `;






