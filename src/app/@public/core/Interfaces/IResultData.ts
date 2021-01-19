export interface IInfoPage {
    page: number;
    pages: number;
    total: number;
    itemsPerPage: number;
}


//**************************************************************************************************
//Listkey y definitionkey hacen referencia a las dos partes que nos devuelve a la consulta                                                           
//  como es la info y la lista de usuarios por ejemplo.
//**************************************************************************************************

export interface IResultData {
    listKey: string;
    definitionKey: string;
}