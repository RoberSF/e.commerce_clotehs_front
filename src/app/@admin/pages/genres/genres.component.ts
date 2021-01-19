import { Component, OnInit } from '@angular/core';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { GenresService } from 'src/app/services/genres.service';
import { IResultData } from '../../../@public/core/Interfaces/IResultData';
import { basicAlert } from '../../../@shared/alerts/toasts';
import { TitleService } from '@admin/core/services/titleService.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit  {


  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';

  constructor(private genreService: GenresService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.updateTitle('Géneros')
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres'
    };
    this.include = false
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


  //**************************************************************************************************
  //         Contiene las acción genérica que tiene que desarrollarse al hacer click en alguno de
  //           los botones implementados en el table-pagination                                                 
  //**************************************************************************************************
    
  async buttonsEdit($event) {

    // Coger la información para las acciones por separado
    const action = $event[0];
    const genre = $event[1];

    // Cogemos el valor por defecto
    const defaultValue = genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, genre);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${genre.name} (${genre.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, genre);
        } else if (result === false) {
          this.blockForm(genre);
        }
        break;
      case 'block':
        this.blockForm(genre);
        break;
        case 'unblock':
          this.unBlockForm(genre);
          break;
      default:
        break;
    }
  }


//**************************************************************************************************
//                        Métodos para añadir un género                                                           
//**************************************************************************************************
                
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir género', html, 'name');
    this.addGenre(result);
  }

  private addGenre(result) {
    if (result.value) {
      this.genreService.add(result.value).subscribe((res: any) => {
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
  
  private async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar género', html, 'name');
    this.updateGenre(genre.id, result);
  }

  private updateGenre(id: string, result) {
    if (result.value) {
      this.genreService.update(id, result.value).subscribe((res: any) => {
        console.log(res);
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
  

  private blockGenre(id: string) {
    this.genreService.block(id).subscribe((res: any) => {
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

  private unBlockGenre(id: string) {
    this.genreService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(genre: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockGenre(genre.id);
    }
  }

  private async unBlockForm(genre: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockGenre(genre.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }







}
