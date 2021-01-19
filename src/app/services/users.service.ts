import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '../@graphql/services/api.service';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import {map} from 'rxjs/operators'
import { ACTIVE_USER, BLOCK_USER, MODIFY_USER, REGISTER_USER } from '@graphql/operations/mutation/user';
import { IRegisterForm } from '@shop/core/Interfaces/IRegister';
import { HttpHeaders } from '@angular/common/http';
import { UNBLOCK_USER, ACTIVE_USER_EMAIL } from '../@graphql/operations/mutation/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
   }

  getUsers(page: number = 1, itemsPerPage: number = 10){ 
    return this.get(USERS_LIST_QUERY,{include: true, itemsPerPage,page }).pipe(map( (result:any) => {
      return  result.users;
    }));
    };

    

    register(user: IRegisterForm) {
      return this.set(REGISTER_USER, {user,include: false}).pipe(map( (result: any) => {
        return result.register;
      }))
    }

    update(user: string) {
      return this.set(MODIFY_USER, {user,include: false}).pipe(map( (result: any) => {
          console.log(result.updateUser);
          return result.updateUser;
        }));
    }

    block(id: string) {
      return this.set(BLOCK_USER,{id}, {}).pipe(map( (result: any) => {
          return result.blockUser;
        }));
    }

    unBlock(id: string) {
      return this.set(UNBLOCK_USER,{id}, {}).pipe(map( (result: any) => {
          return result.unBlockUser;
        }));
    }

    active(token: string, birthday: string, password: string) {

    const user = JSON.parse(atob(token.split('.')[1])).user; // accedemos a la información del token

      return this.set(
        ACTIVE_USER, 
        {id: user.id ,birthday, password,include: false},
         {headers: new HttpHeaders({ Authorization: token}) // Hay qu enviarselo al back
         }).pipe(map( (result: any) => {
        return result.activeUserAction;
      }))
    }

    senEmailActive( id: string, email: string) {
      return this.set(ACTIVE_USER_EMAIL,{id, email}, {}).pipe(map( (result: any) => {
        return result.activeUserEmail;
      }));
    }
}
