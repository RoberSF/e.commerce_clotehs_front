import { TitleService } from '@admin/core/services/titleService.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { CATEGORIAS_LIST_QUERY, SEARCH_CATEGORIA_QUERY } from '@graphql/operations/query/categoria';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  query: DocumentNode = CATEGORIAS_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();
  
  constructor(private titleService: TitleService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.titleService.updateTitle('Categorias')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'categorias',
      definitionKey: 'categorias',
      searchKey: 'categoriaSearch'
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
    const categoria = $event[1];

    // Cogemos el valor por defecto
    const defaultValue = categoria.name !== undefined && categoria.name !== '' ? categoria.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, categoria);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${categoria.name} (${categoria.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, categoria);
        } else if (result === false) {
          this.blockForm(categoria);
        }
        break;
      case 'block':
        this.blockForm(categoria);
        break;
        case 'unblock':
          this.unBlockForm(categoria);
          break;
      default:
        break;
    }
  }


//**************************************************************************************************
//                        Métodos para añadir un género                                                           
//**************************************************************************************************
                
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir categoria', html, 'name');
    this.addCategoria(result);
  }

  private addCategoria(result) {
    if (result.value) {
      this.categoriaService.add(result.value).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
          basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  //**************************************************************************************************
  //                    Métodos para actualizar género                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, categoria: any) {
    const result = await formBasicDialog('Modificar categoria', html, 'name');
    this.updateCategoria(categoria.id, result);
  }

  private updateCategoria(id: string, result) {
    if (result.value) {
      this.categoriaService.update(id, result.value).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  //**************************************************************************************************
  //              Método para bloquear un género                                                           
  //**************************************************************************************************
  

  private blockCategoria(id: string) {
    this.categoriaService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  //**************************************************************************************************
  //              Método para desbloquear un género                                                           
  //**************************************************************************************************

  private unBlockCategoria(id: string) {
    this.categoriaService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(categoria: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockCategoria(categoria.id);
    }
  }

  private async unBlockForm(categoria: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockCategoria(categoria.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_CATEGORIA_QUERY]

    this.searchValue$.emit(searchObject);

  }

}
