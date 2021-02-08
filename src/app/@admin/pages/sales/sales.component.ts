import { TitleService } from '@admin/core/services/titleService.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SALE_LIST_QUERY, SEARCH_SALE_QUERY } from '@graphql/operations/query/sale';
import { ApiService } from '@graphql/services/api.service';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { ModalUploadService } from 'src/app/@shared/modal-upload/modal-upload.service';
import { SaleService } from 'src/app/services/sales.service';
import { basicAlert } from '../../../@shared/alerts/toasts';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  query: DocumentNode = SALE_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();

  
  constructor(private titleService: TitleService, public saleService: SaleService, public http: HttpClient, public apiService: ApiService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.titleService.updateTitle('Sales')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'sales',
      definitionKey: 'sales',
      searchKey: 'saleSearch'
    };
    this.include = true
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre cliente'
      },
      {
        property: 'platform',
        label: 'Plataforma'
      },
      {
        property: 'date',
        label: 'Fecha'
      },
      {
        property: 'totalOperation',
        label: 'Total'
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
    const sale = $event[1];


    switch (action) {
      case 'add':
          basicAlert(TYPE_ALERT.WARNING, 'Acción no disponible en este apartado')
        break;
      case 'edit':
        basicAlert(TYPE_ALERT.WARNING, 'Acción no disponible en este apartado')
        break;
      case 'info':
        // Añadir modal con información del pedido
        basicAlert(TYPE_ALERT.WARNING, 'Acción no disponible en este apartado')
        break;
      case 'block':
        this.blockForm(sale);
        break;
        case 'unblock':
          this.unBlockForm(sale);
          break;
      case 'delete':
          basicAlert(TYPE_ALERT.WARNING, 'Acción no disponible en este apartado')
          break;
      default:
        break;
    }
  }

  private blockSale(id: string) {
    this.saleService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private unBlockSale(id: string) {
    this.saleService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(sale: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockSale(sale.id);
    }
  }

  private async unBlockForm(sale: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockSale(sale.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_SALE_QUERY]

    this.searchValue$.emit(searchObject);

  }

  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

}
