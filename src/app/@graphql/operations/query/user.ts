import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';


//**************************************************************************************************
//    Forma de hacer las querys a graphql                                                           
//**************************************************************************************************

export const LOGIN_QUERY = gql`
 query getLogin($email:String!, $password:String!, $include: Boolean!){

    login(email: $email, password: $password) {
      status
      message
      token
      user {
                ...UserObject
            }
      menu {
      title
      submenu {
        url
        label
        icon
      }
    }
    }

  }
      ${USER_FRAGMENT}
  `;


//Sería ponerlo igual que lo haríamos en apollo server
export const USERS_LIST_QUERY = gql`
    query usersList ($include: Boolean!, $page: Int, $itemsPerPage: Int, $active: ActiveFilterEnum){
        users(page: $page, itemsPerPage: $itemsPerPage, active: $active) {
            info {
                ...ResultInfoObject
            }
            status
            message
            users {
                ...UserObject
            }
        }
    }
    ${ USER_FRAGMENT }
    ${ RESULT_INFO_FRAGMENT }
`;

export const ME_DATA_QUERY = gql`
    query meData($include: Boolean!){
        me {
            status
            message
            user {
                ...UserObject
            }
            menu {
              title
              submenu {
                url
                label
                icon
              }
    }
            
        }
    }
    ${ USER_FRAGMENT }
`;




