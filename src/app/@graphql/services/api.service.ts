import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY, USERS_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import {map} from 'rxjs/operators'
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@shop/core/Interfaces/IRegister';
import { REGISTER_USER } from '@graphql/operations/mutation/user';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  //**************************************************************************************************
  //        Consumir servicios de la Api hecha con graphql                                                          
  //**************************************************************************************************

  //**************************************************************************************************
  //          Configuración para subscribirse a los métodos de la Api para hacer mutation                                                           
  //**************************************************************************************************

  // Ponemos protected para que solo se pueda acceder a ella desde el hijo o en la propia clase
  protected get(query: DocumentNode, variables: object = {}, context: object = {}, cache: boolean = true) {
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: (cache) ? 'network-only' : 'no-cache'
    }).valueChanges.pipe(map((result) => {
      return result.data
    })
    )}

    //**************************************************************************************************
    //          Configuración para subscribirse a los métodos de la Api para hacer mutation                                                           
    //**************************************************************************************************
    protected set(mutation: DocumentNode, variables: object = {}, context: object = {}) {
      return this.apollo.mutate({
        mutation,
        variables,
        context
      }).pipe(map( (result) => {
        return result.data;
      })) 
    };

    //**************************************************************************************************
    //          Configuración para subscribirse a los métodos de la Api de subscription                                                           
    //**************************************************************************************************
    
    protected subscription(subscription: DocumentNode, variables: object = {}) {
      return this.apollo.subscribe({
        query: subscription,
        variables,
      }).pipe(map( (result) => {
        return result.data;
      })) 
    }



}
