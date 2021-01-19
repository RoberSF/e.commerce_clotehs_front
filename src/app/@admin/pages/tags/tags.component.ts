import { Component, OnInit } from '@angular/core';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { TitleService } from '@admin/core/services/titleService.service';
import { TagService } from '../../../services/tag.service';
import { TAGS_LIST_QUERY } from '@graphql/operations/query/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  query: DocumentNode = TAGS_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  
  constructor(private titleService: TitleService, private tagService: TagService) { }

  ngOnInit(): void {
    this.titleService.updateTitle('Tags')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'tags',
      definitionKey: 'tags'
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
    const tag = $event[1];

    // Cogemos el valor por defecto
    const defaultValue = tag.name !== undefined && tag.name !== '' ? tag.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, tag);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${tag.name} (${tag.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, tag);
        } else if (result === false) {
          this.blockForm(tag);
        }
        break;
      case 'block':
        this.blockForm(tag);
        break;
        case 'unblock':
          this.unBlockForm(tag);
          break;
      default:
        break;
    }
  }


//**************************************************************************************************
//                        Métodos para añadir un género                                                           
//**************************************************************************************************
                
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir tag', html, 'name');
    this.addTag(result);
  }

  private addTag(result) {
    if (result.value) {
      this.tagService.add(result.value).subscribe((res: any) => {
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
  
  private async updateForm(html: string, tag: any) {
    const result = await formBasicDialog('Modificar tag', html, 'name');
    this.updateTag(tag.id, result);
  }

  private updateTag(id: string, result) {
    if (result.value) {
      this.tagService.update(id, result.value).subscribe((res: any) => {
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
  

  private blockTag(id: string) {
    this.tagService.block(id).subscribe((res: any) => {
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

  private unBlockTag(id: string) {
    this.tagService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(tag: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockTag(tag.id);
    }
  }

  private async unBlockForm(tag: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockTag(tag.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

}
