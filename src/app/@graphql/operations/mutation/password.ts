import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';


export const RESET_PASS = gql`
    mutation resetPassword($email: String!) {
      
      resetPassword(email: $email) {
        status
        message
      }
    }`



export const CHANGE_PASS = gql`
    mutation changePassword($id: ID!, $password: string!) {
      
      changePassword(id: $d  , password: $password ) {
        status
        message
      }
    }`

  