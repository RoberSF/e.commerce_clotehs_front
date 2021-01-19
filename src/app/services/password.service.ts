import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '../@graphql/services/api.service';
import {map} from 'rxjs/operators'
import { CHANGE_PASS, RESET_PASS } from '@graphql/operations/mutation/password';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PassService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
   }


   reset(email: string) {
    return this.set(RESET_PASS, {email}).pipe(map((result: any) => {
        return result.resetPassword;
    }))
}

change(token: string,password: string) {

  const user = JSON.parse(atob(token.split('.')[1])).user; // accedemos a la información del token

  return this.set(CHANGE_PASS,
     {id: user.id, password},
     {
       headers: new HttpHeaders({
         Authorization: token
       })
     }).pipe(map((result: any) => {
    return result.changePassword;
}))
}
  
}
