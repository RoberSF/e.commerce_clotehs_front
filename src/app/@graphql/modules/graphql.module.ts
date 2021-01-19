import { NgModule } from '@angular/core';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { onError } from 'apollo-link-error';
import { ApolloLink, split} from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


//**************************************************************************************************
//                            Módulo de conexión con graphql                                                           
//**************************************************************************************************

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // Para capturar los errores de consulta y/o de red
    const errorLink = onError(({graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('GraphQL Errors', graphQLErrors);
      }

      if (networkError) {
        console.log('Networkd Errors', networkError);
      }
    });
    const uri = 'http://localhost:2002/graphql';
    const urlLink = ApolloLink.from([errorLink,httpLink.create({uri})]);

    //**************************************************************************************************
    //         Configuración para cnectarse al websocket                                                           
    //**************************************************************************************************
    
    const subscriptionLink = new WebSocketLink(
      {uri: 'ws://localhost:2002/graphql',
      options: {
        reconnect: true
      } });

    const link = split( 
      ( {query}) => {
        const  { kind, operation}: any = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      }, 
      subscriptionLink,
      urlLink)


//**************************************************************************************************
//                                  Abre conexión                                                           
//**************************************************************************************************

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
