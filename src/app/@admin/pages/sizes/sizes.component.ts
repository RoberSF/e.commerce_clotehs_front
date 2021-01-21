import { TitleService } from '@admin/core/services/titleService.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { SEARCH_SIZE_QUERY, SIZES_LIST_QUERY } from '@graphql/operations/query/size';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { SizeService } from 'src/app/services/size.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {

  query: DocumentNode = SIZES_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();
  
  constructor(private titleService: TitleService, public sizeService: SizeService) { }

  ngOnInit() {

    this.titleService.updateTitle('Tallas')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'sizes',
      definitionKey: 'sizes',
      searchKey: 'sizeSearch'
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
        property: 'active',
        label: '¿Activo?'
      },
    ]
  }

  async buttonsEdit($event) {

    // Coger la información para las acciones por separado
    const action = $event[0];
    const size = $event[1];

    // Cogemos el valor por defecto
    const defaultValue = size.name !== undefined && size.name !== '' ? size.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, size);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${size.name} (${size.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, size);
        } else if (result === false) {
          this.blockForm(size);
        }
        break;
      case 'block':
        this.blockForm(size);
        break;
        case 'unblock':
          this.unBlockForm(size);
          break;
        case 'delete':
          this.deleteForm(size);
          break;
      default:
        break;
    }
  }

//**************************************************************************************************
//                        Métodos para añadir un size                                                           
//**************************************************************************************************
 
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir talla', html, 'name');
    this.addSize(result);
  }

  private addSize(result) {
    if (result.value) {
      this.sizeService.add(result.value).subscribe((res: any) => {
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
  //                    Métodos para actualizar size                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, size: any) {
    const result = await formBasicDialog('Modificar talla', html, 'name');
    this.updateSize(size.id, result);
  }

  private updateSize(id: string, result) {
    if (result.value) {
      this.sizeService.update(id, result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.reload();
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

    //**************************************************************************************************
  //              Método para bloquear un size                                                           
  //**************************************************************************************************
  

  private blockSize(id: string) {
    this.sizeService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        this.reload();
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  //**************************************************************************************************
  //              Método para desbloquear un size                                                           
  //**************************************************************************************************

  private unBlockSize(id: string) {
    this.sizeService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(size: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockSize(size.id);
    }
  }

  private async unBlockForm(size: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockSize(size.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

  private async deleteForm(size: any) {


    const result =

      await optionsWithDetails(
        'Borrar?',
        `Si borras el item seleccionado se eliminará de la base de datos`,
        500,
        'No, no borrar',
        'Si, borrar'
      ) 

    if(result == false) {
      this.deleteSize(size.id);
      this.reload();
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  deleteSize(id: string) {

    this.sizeService.delete(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_SIZE_QUERY]

    this.searchValue$.emit(searchObject);

  }

}
