import { Injectable } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import { ADD_POST, MODIFY_POST, BLOCK_POST, UNBLOCK_POST, DELETE_POST } from '../@graphql/operations/mutation/post';
import { Apollo } from 'apollo-angular';
import { ApiService } from '../@graphql/services/api.service';
import { POST_LIST_QUERY, POST_QUERY } from '../@graphql/operations/query/post';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiService {

  totalPosts: number = 0;

  constructor(apollo: Apollo) { 
    super(apollo);
  }



  getPosts(page: number = 1, itemsPerPage: number = 10){ 
    return this.get(POST_LIST_QUERY,{itemsPerPage,page }).pipe(map( (result:any) => {
      return  result.users;
    }));
    };


   deletePost(id:string) {

    return this.set(DELETE_POST,{id}, {}).pipe(map( (result: any) => {
        return result.addPost;
      }));
    };



  postPost(post: any) {
    return this.set(ADD_POST,{post}, {}).pipe(map( (result: any) => {
        return result.addPost;
      }));
  }

  block(id: string) {
    return this.set(
      BLOCK_POST,
      {
        id
      }, {}).pipe(map( (result: any) => {
        return result.blockPost;
      }));
  }

  unBlock(id: string) {
    return this.set(UNBLOCK_POST,{id}, {}).pipe(map( (result: any) => {
        return result.unBlockPost;
      }));
  }


update(id: string, post: any) {
    return this.set(
      MODIFY_POST,
      {
        id,
        post
      }, {}).pipe(map( (result: any) => {
        return result.updatePost;
      }));
  }

getPost(id: string) {
    return this.set(
      POST_QUERY,
      {
        id,
      }, {}).pipe(map( (result: any) => {
        return result.post;
      }));
  }


//   async subirPost(post: FormData) {

//     let url = URL_SERVICIOS + '/post/postImg'

//     var headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//        Authorization: this.usuarioService.token
//     });

//     return this.http.post(url, post, {headers: headers}).pipe(map( // {title} se pone así por que es el unico parametro que está recibiendo, en este caso son obligatorios más, asi que tendría que enviarle más parámetros
//       (resp:any) => {
//         swal('Post creado', 'success');
//         return resp.post;
//       }));
// }

}
