import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { COLORS_LIST_QUERY } from '@graphql/operations/query/color';
import { ADD_COLOR, DELETE_COLOR, MODIFY_COLOR, UNBLOCK_COLOR } from '@graphql/operations/mutation/color';
import { BLOCK_COLOR, SINGLE_UPLOAD } from '../@graphql/operations/mutation/color';
import { IColor } from '@admin/core/interfaces/IColor';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(color: IColor) {
  return this.set(ADD_COLOR,{color}, {}).pipe(map( (result: any) => {
      return result.addColor;
    }));
}

update(id: string, color: IColor) {
  return this.set(
    MODIFY_COLOR,
    {
      id,
      color
    }, {}).pipe(map( (result: any) => {
      return result.updateColor;
    }));
}

block(id: string) {
  return this.set(
    BLOCK_COLOR,
    {
      id
    }, {}).pipe(map( (result: any) => {
      return result.blockColor;
    }));
}

unBlock(id: string) {
  return this.set(UNBLOCK_COLOR,{id}, {}).pipe(map( (result: any) => {
      return result.unBlockColor;
    }));
}

colors() {
    return this.get(COLORS_LIST_QUERY,{}, {}).pipe(map( (result: any) => {
        return result.colors;
      }));
}

delete(id: string) {
  return this.set(DELETE_COLOR, {id}, {}).pipe(map( (result: any) => {
    return result.deleteColor;
  }));
}

upload(file) {
  return this.set(SINGLE_UPLOAD, {file}, { useMultiPart: true})
}

uploadFile(file: File, type: string, id: string) {

      return new Promise((resolve,reject) => {

      
        let formData = new FormData(); // es el payload que yo quiero mandar subir // Para crear la data que quiero enviar al back
        let xhr = new XMLHttpRequest(); //inicializamos la petición ajax
    
        formData.append('imagen', file, file.name) // 'imagen' es el nombre que le doy en el backend
    
        xhr.onreadystatechange = function() { // esto es la configuracion de la petición ajax, de como va a funcionar
          if ( xhr.readyState ===4 ) { // el 4 es un estado de la subida, podría jugar con ellos para hacer un loading
            if (xhr.status === 200 ) {
              alert('File Subido');
              resolve(JSON.parse(xhr.response));
            } else {
              alert('Subida Fallida');
              reject(xhr.response)
            }
          }
        };


        let url = `http://localhost:2002/upload/${type}/${id}`

        xhr.open('PUT',url, true ); // el true dice si quiero que sea asincrono

        xhr.send(formData);
})

}





}