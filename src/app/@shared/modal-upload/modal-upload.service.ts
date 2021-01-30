import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../@graphql/services/api.service';
import { ShopGuard } from '../../guards/shop.guard';
import { basicAlert } from '../alerts/toasts';
import { TYPE_ALERT } from '../alerts/values.config';
const jwtDecode = require('jwt-decode');

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService extends ApiService {

  constructor(apollo: Apollo, private auth: AuthService) {
    super(apollo)
}

uploadFile(file: File, type: string, id: string) {

    return new Promise((resolve,reject) => {

      this.auth.getSession().token

      let token = this.auth.getSession().token
      let formData = new FormData(); // es el payload que yo quiero mandar subir // Para crear la data que quiero enviar al back
      let xhr = new XMLHttpRequest(); //inicializamos la petición ajax
  
      formData.append('imagen', file, file.name) // 'imagen' es el nombre que le doy en el backend

      xhr.onreadystatechange = function() { // esto es la configuracion de la petición ajax, de como va a funcionar
        if ( xhr.readyState === 4 ) { // el 4 es un estado de la subida, podría jugar con ellos para hacer un loading
          if (xhr.status === 200 ) {
            basicAlert(TYPE_ALERT.SUCCESS,'File Subido')
            resolve(JSON.parse(xhr.response));
          } else {
            basicAlert(TYPE_ALERT.ERROR, 'Subida fallida')
            reject(xhr.response)
          }
        }
      };


      let url = `http://localhost:2002/upload/${type}/${id}`

      xhr.open('PUT',url, true ); // el true dice si quiero que sea asincrono

      xhr.setRequestHeader('Authorization', token)

      xhr.send(formData);
})

}

}
