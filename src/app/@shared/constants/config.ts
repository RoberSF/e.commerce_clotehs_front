import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';

export const CURRENCY_SELECTED = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];

export const CURRENCY_CODE = CURRENCY_LIST.EURO;


//**************************************************************************************************
//                    Rutas para redireccionar para después de login 
// Comprobaremos cuando hagamos login si existe alguna de las rutas que hay en esta constante
// para que deje una marca y hagamos la redirección a dónde corresponde                                                          
//**************************************************************************************************

export const REDIRECT_ROUTES = [
    '/checkout'
];