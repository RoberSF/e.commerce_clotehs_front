import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { USERS_LIST_QUERY } from '../../@graphql/operations/query/user';
import { IResultData, IInfoPage } from '../../@public/core/Interfaces/IResultData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { closeAlert, loadData } from 'src/app/@shared/alerts/alerts';

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





constructor(private paginationService: TablePaginationService) { }

ngOnInit(): void {

  this.reload.subscribe( (res:any) => {
    if( res === true ) {
      this.loadData()
    }
  })

  this.searchValue.subscribe ( (res:any) => {

    this.loading = true;
    loadData('Cargando búsqueda', 'Casi estamos');

    const variables = {
      page: this.infoPage.page,
      itemsPerPage: this.itemsPerPage,
      include: this.include,
      active: this.filterActiveValue,
      value: res[0]
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

}
