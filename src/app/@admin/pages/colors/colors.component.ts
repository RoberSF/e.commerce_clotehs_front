import { TitleService } from '@admin/core/services/titleService.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { COLORS_LIST_QUERY, SEARCH_COLOR_QUERY } from '@graphql/operations/query/color';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, formColorDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { ColorService } from 'src/app/services/color.service';
import { IColor } from '../../core/interfaces/IColor';
import { ApiService } from '../../../@graphql/services/api.service';
import { NgForm } from '@angular/forms';
import { fileURLToPath } from 'url';
import { type } from 'os';
import { ModalUploadService } from '../../../@shared/modal-upload/modal-upload.service';


@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {


  query: DocumentNode = COLORS_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();
  uploadFile: File;
  imagenTemp: any;
  photoData: any = <any>{};
  @ViewChild('photoUpload', {static: false}) photoUpload: any;
  EmiterImgTemp = new EventEmitter<any>();
  colorId: string
  modalUpload = false;
  
  constructor(private titleService: TitleService, public colorService: ColorService, public http: HttpClient, public apiService: ApiService,
                public modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.titleService.updateTitle('Colors')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'colors',
      definitionKey: 'colors',
      searchKey: 'colorSearch'
    };
    this.include = true
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre'
      },
      {
        property: 'slug',
        label: 'Slug'
      },
      {
        property: 'code',
        label: 'Code'
      },
      {
        property: 'img',
        label: 'Imagen'
      },
      {
        property: 'active',
        label: '¿Activo?'
      },
    ]
  }

  async buttonsEdit($event) {

    // Coger la información para las acciones por separado
    const action = $event[0];
    const color = $event[1];

    // Cogemos el valor por defecto
    const defaultName = color.name !== undefined && color.name !== '' ? color.name : '';
    const defaultCode = color.code !== undefined && color.code !== '' ? color.code : '';
    const html = `<input id="name" placeholder="Añadir nombre" value="${defaultName}" class="swal2-input" required>
                  <input id="code" placeholder="Añadir codigo" value="${defaultCode}" class="swal2-input" required>
                  <select id="active" class="swal2-input">
                    <option value=true >Active</option>
                    <option value=false>No Active</option>
                  </select>
                `;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, color);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${color.name} (${color.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, color);
        } else if (result === false) {
          this.blockForm(color);
        }
        break;
      case 'block':
        this.blockForm(color);
        break;
        case 'unblock':
          this.unBlockForm(color);
          break;
      case 'delete':
        this.deleteForm(color);
          break;
      default:
        break;
    }
  }

//**************************************************************************************************
//                        Métodos para añadir un color                                                           
//**************************************************************************************************
 
  private async addForm(html: string) {
    const result = await formColorDialog('Añadir color', html, 'name');
    const color: IColor = {
      name: result.value[0],
      code: result.value[1],
      active: result.value[2] === 'true' ? true : false
    }
    this.addColor(color);
  }

  private addColor(color) {
    if (color) {
      this.colorService.add(color).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.reload()
          return;
        }
          basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  //**************************************************************************************************
  //                    Métodos para actualizar color                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, color: any) {
    const result = await formColorDialog('Modificar color', html, 'name');
    const colorObjectUpdate: IColor = {
      name: result.value[0],
      code: result.value[1],
      active: result.value[2] === 'true' ? true : false
    }
    this.updateColor(color.id, colorObjectUpdate);
  }

  private updateColor(id: string, colorObjectUpdate) {
    if (colorObjectUpdate) {
      this.colorService.update(id, colorObjectUpdate).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.reload()
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

    //**************************************************************************************************
  //              Método para bloquear un color                                                           
  //**************************************************************************************************
  

  private blockColor(id: string) {
    this.colorService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  //**************************************************************************************************
  //              Método para desbloquear un color                                                           
  //**************************************************************************************************

  private unBlockColor(id: string) {
    this.colorService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(color: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockColor(color.id);
    }
  }

  private async unBlockForm(color: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockColor(color.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

  private async deleteForm(color: any) {


    const result =

      await optionsWithDetails(
        'Borrar?',
        `Si borras el item seleccionado se eliminará de la base de datos`,
        500,
        'No, no borrar',
        'Si, borrar'
      ) 

    if(result == false) {
      this.deleteColor(color.id);
      this.reload();
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  deleteColor(id: string) {

    this.colorService.delete(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_COLOR_QUERY]

    this.searchValue$.emit(searchObject);

  }

  // Método de subida por petición put que si guarda en storage
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

  this.modalUploadService.uploadFile(this.uploadFile, this.resultData.listKey, this.colorId) .then(resp => {
    this.modalUpload = false;
    this.imagenTemp = '';
    this.reload()
  })
  .catch(resp => {
    console.log('Error en la carga')
  })
}
  

  // Opción JingShao Chen. No recoge el context la api
  selectImage1($event) {

    var operations = {

      query: `
        mutation($file: Upload!) {
          singleUpload(file: $file) {
            id
          }
        }
      `,
      variables: {
        file: null
      },
      context: {
        useMultipart: true
      }
  }

  var _map = { 
    file: ["variables.file"]
  }

  var file = $event.target.files[0]
  var fd = new FormData()
    fd.append('operations', JSON.stringify(operations))
    fd.append('map', JSON.stringify(_map))
    fd.append('file', file, file.name)


  this.http.post('http://localhost:2002/graphql', fd, {
    reportProgress: true,
    observe: 'events'
  }).subscribe()
}

// Opción normal(no-works). No recoge file. Error: createReadStream is not a function
selectImage2($event) {
  var file = $event.target.files[0]
  this.colorService.upload(file).subscribe()

}

save(uploadForm: NgForm) {

  if (uploadForm.invalid || !this.photoData.file) {
    return;
  }
  const { file } = this.photoData;

  this.colorService.upload(file).subscribe()
}




}