//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';


export const RESULT_INFO_FRAGMENT = gql`
    fragment ResultInfoObject on ResultInfo {
        page
        pages
        total
        itemsPerPage
    }
`;