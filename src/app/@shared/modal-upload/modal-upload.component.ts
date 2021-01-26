import { Component, EventEmitter, OnInit } from '@angular/core';
import { basicAlert } from '../alerts/toasts';
import { TYPE_ALERT } from '../alerts/values.config';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss']
})
export class ModalUploadComponent implements OnInit {


  EmiterImgTemp = new EventEmitter<any>();
  colorId: string
  modalUpload = false;
  uploadFile: File;
  imagenTemp: any;
  // Recibir

  File
  listKey
  itemId

  constructor(public modalUploadService: ModalUploadService) { }
  

  ngOnInit(): void {
  }

  selectImage(file: File) {

    if( !file ) {
      this.uploadFile = null;
      return;
    }

    if ( file.type.indexOf('image') <0 ) {
      basicAlert(TYPE_ALERT.WARNING, 'Inténtalo de nuevo')
    }

    this.uploadFile = file;


    let reader = new FileReader(); //esto es javascript puro
    let urlImagenTemp =  reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
      this.EmiterImgTemp.emit(this.imagenTemp)

      // this.http.put('http://localhost:2002/upload',  this.uploadFile, {
      //   reportProgress: true,
      //   observe: 'events'
      // }).subscribe()

    }

  }


upload() {

  // this.modalUploadService.uploadFile(this.uploadFile, this.resultData.listKey, this.colorId) .then(resp => {
  //   this.modalUpload = false;
  //   this.reload();
  // })
  // .catch(resp => {
  //   console.log('Error en la carga')
  // })
}

}
