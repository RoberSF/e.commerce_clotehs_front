import { TitleService } from '@admin/core/services/titleService.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { POST_LIST_QUERY, SEARCH_POST_QUERY } from '@graphql/operations/query/post';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  query: DocumentNode = POST_LIST_QUERY
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();
  
  constructor(private titleService: TitleService, public postService: PostService) { }

  ngOnInit(): void {

    this.titleService.updateTitle('Posts')
    this.context = {};
    this.itemsPerPage = 20;
    this.resultData = {
      listKey: 'posts',
      definitionKey: 'posts',
      searchKey: 'postSearch'
    };
    this.include = true
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'title',
        label: 'Título'
      },
      {
        property: 'categoria',
        label: 'Categoría'
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
    const post = $event[1];

    switch (action) {
      case 'add':
        basicAlert(TYPE_ALERT.WARNING, ' Acción nos disponible en este apartado');
        break;
      case 'edit':
        basicAlert(TYPE_ALERT.WARNING, ' Acción nos disponible en este apartado');
        break;
      case 'info':
        basicAlert(TYPE_ALERT.WARNING, ' Acción nos disponible en este apartado');
        break;
      case 'block':
        this.blockForm(post);
        break;
        case 'unblock':
          this.unBlockForm(post);
          break;
      case 'delete':
        this.deleteForm(post);
          break;
      default:
        break;
    }
  }

  private async blockForm(post: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockPost(post.id);
    }
  }

  private async unBlockForm(post: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockPost(post.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }


  //**************************************************************************************************
  //              Método para bloquear un post                                                           
  //**************************************************************************************************
  

  private blockPost(id: string) {
    this.postService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  //**************************************************************************************************
  //              Método para desbloquear un post                                                           
  //**************************************************************************************************

  private unBlockPost(id: string) {
    this.postService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async deleteForm(post: any) {


    const result =

      await optionsWithDetails(
        'Borrar?',
        `Si borras el item seleccionado se eliminará de la base de datos`,
        500,
        'No, no borrar',
        'Si, borrar'
      ) 

    if(result == false) {
      this.deletePost(post.id);
      this.reload();
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  deletePost(id: string) {

    this.postService.delete(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_POST_QUERY]

    this.searchValue$.emit(searchObject);

  }

}
