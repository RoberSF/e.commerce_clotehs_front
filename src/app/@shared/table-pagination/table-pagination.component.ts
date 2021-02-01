import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { USERS_LIST_QUERY } from '../../@graphql/operations/query/user';
import { IResultData, IInfoPage } from '../../@public/core/Interfaces/IResultData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { closeAlert, loadData } from 'src/app/@shared/alerts/alerts';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { basicAlert } from '../alerts/toasts';
import { TYPE_ALERT } from '../alerts/values.config';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {


//**************************************************************************************************
//                                      Entrada de data                                                           
//**************************************************************************************************

@Input() query: DocumentNode = USERS_LIST_QUERY;
@Input() context: object;
@Input() itemsPerPage = 20;
@Input() include = true;
@Input() resultData: IResultData;
@Input() tableColumns: Array<ITableColumns> = undefined;
// ACTIVE, INACTIVE, ALL
@Input() filterActiveValue = 'ACTIVE' // Por defecto va a ser ACTIVE y por html-ngModel le asigno el valor que yo quiera
@Input() reload: Observable<any>;
@Input() searchValue:  Observable<any>;

//**************************************************************************************************
//                                     Salida de data                                                           
//**************************************************************************************************

@Output() manageItem = new EventEmitter<Array<any>>();

//**************************************************************************************************
//                                       Variables                                                           
//**************************************************************************************************

infoPage: IInfoPage;
data$: Observable<any>;
loading:boolean;
dataLocal;
uploadFile: File;
imagenTemp: any;
EmiterImgTemp = new EventEmitter<any>();
itemId: string;
modalUpload = false;
cloudyCollection = '';





constructor(private paginationService: TablePaginationService, public modalUploadService: ModalUploadService) { }

ngOnInit(): void {

  this.reload.subscribe( (res:any) => {
    if( res === true ) {
      this.loadData()
    }
  })

  // 3 Recibe el dato de búsqueda con el array con la info y hace la búsqueda 
  this.searchValue.subscribe ( (res:any) => {

    this.loading = true;
    loadData('Cargando búsqueda', 'Casi estamos');

    const variables = {
      page: this.infoPage.page,
      itemsPerPage: this.itemsPerPage,
      include: this.include,
      active: this.filterActiveValue,
      value: res[0],
      categoriasId: res[2] || []
    }

    this.data$ = this.paginationService.getCollectionData(res[1], variables, {}).pipe(map(
      (result:any) => {
        const data = result[this.resultData.searchKey];
        // this.infoPage.pages = data.info.pages === undefined ? '' : data.info.pages;
        // this.infoPage.total = data.info.total === undefined ? '' : data.info.total;
        this.loading = false;
        closeAlert();
        return data[this.resultData.listKey];
      })
    )
  })

  

    if(this.query === undefined){
      throw new Error('Query is undifinied, please add one')
    }
    if(this.resultData === undefined){
      throw new Error('resultData is undifinied, please add one')
    }
    if(this.tableColumns === undefined){
      throw new Error('Columns are undifinied, please add ones')
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPerPage: this.itemsPerPage,
      total: 1
    }
    
    this.cloudyCollection = this.resultData.listKey
    this.loadData();
  }

  //**************************************************************************************************
  //          Función para cargar la info                                                           
  //**************************************************************************************************
  
  loadData() {
    
    this.loading = true;
    loadData('Cargando los datos', 'Casi estamos')
    const variables = {
      page: this.infoPage.page,
      itemsPerPage: this.itemsPerPage,
      include: this.include,
      active: this.filterActiveValue
    }

    this.data$ = this.paginationService.getCollectionData(this.query, variables, {}).pipe(map(
      (result:any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        this.loading = false;
        closeAlert();
        return data[this.resultData.listKey];
      })
    )
  }

  changePage() {
    this.loadData();
  }


  //**************************************************************************************************
  //     Metodo para manejar las acciones de los botones edit,info & block   
  //      La data es enviada desde el evento click que recoge el *ngFor del template                                                        
  //**************************************************************************************************
  

  manageAction(action: string, data: any) {
    // console.log(action, data);
    this.manageItem.emit([action, data]);
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

    this.modalUploadService.uploadFile(this.uploadFile, this.cloudyCollection, this.itemId) .then(resp => {
      this.modalUpload = false;
      this.imagenTemp = '';
      this.loadData()
    })
    .catch(resp => {
      console.log('Error en la carga')
    })
  }

  closeModal() {
    this.modalUpload = false
  }

  openModal(data, collection) {

    if(collection === 'screenshoots') {
      this.cloudyCollection = 'screenshoots',
      console.log(this.cloudyCollection);
    }

    this.itemId = data.id;
    this.modalUpload = true;
    
  }

}
