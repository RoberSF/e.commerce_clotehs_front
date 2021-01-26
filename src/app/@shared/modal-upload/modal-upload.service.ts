import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '../../@graphql/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo)
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
