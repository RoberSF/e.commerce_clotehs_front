import gql from 'graphql-tag';
import { COLOR_FRAGMENT } from '../fragment/color';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_COLOR = gql`

mutation addSize($color: ColorInput!) {
    addColor(color: $color) {
      status
      message
      color {
        ...ColorObject
      }
    }
  }
  ${COLOR_FRAGMENT}
  `;

export const MODIFY_COLOR = gql`

mutation updateColor($id: ID!, $color: ColorInput!) {
    updateColor(id: $id, color: $color) {
    status
    message
    color {
      ...ColorObject
    }
  }
}
${COLOR_FRAGMENT}
  `;

export const BLOCK_COLOR = gql`

mutation blockColor($id: ID!) {
    blockColor(id: $id) {
    status
    message
  }
}
  `;

export const UNBLOCK_COLOR = gql`
mutation unBlockColor($id: ID!) {
    unBlockColor(id: $id) {
      status
      message
    }
  }
  `;

export const DELETE_COLOR = gql`
mutation deleteColor($id: ID!) {
  deleteColor(id: $id) {
      status
      message
    }
  }
  `;
