import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '../../../@public/core/Interfaces/IResultData';
import { USERS_LIST_QUERY } from '../../../@graphql/operations/query/user';
import { ITableColumns } from '../../../@public/core/Interfaces/ITableColumns';
import { optionsWithDetails, userFormBasicDialog } from 'src/app/@shared/alerts/alerts';
import { UsersService } from '../../../services/users.service';
import { IRegisterForm } from '../../../@public/core/Interfaces/IRegister';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { TitleService } from '@admin/core/services/titleService.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE'

  constructor(private userService: UsersService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.updateTitle('Usuarios')
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users'
    };
    this.include = true;
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
        property: 'lastname',
        label: 'Last Name'
      },
      {
        property: 'email',
        label: 'Email'
      },
      {
        property: 'registerDate',
        label: 'Register Date'
      },
      {
        property: 'birthday',
        label: 'Birthday'
      },
      {
        property: 'role',
        label: 'Role'
      },
      {
        property: 'active',
        label: '¿Activo?'
      },
    ]
  };


  private initializeForm(user: any) {
    const defaultName = user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastname = user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail = user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] = user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    roles[1] = user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
    return `
      <input id="name" value="${defaultName}" class="swal2-input" placeholder="Nombre" required>
      <input id="lastname" value="${defaultLastname}" class="swal2-input" placeholder="Apellidos" required>
      <input id="email" value="${defaultEmail}" class="swal2-input" placeholder="Correo Electrónico" required>
      <select id="role" class="swal2-input">
        <option value="ADMIN" ${roles[0]}>Administrador</option>
        <option value="CLIENT" ${roles[1]}>Cliente</option>
      </select>
    `;
  }

  async buttonsEdit($event) {

    // Coger la información para las acciones por separado
    const action = $event[0];
    const user = $event[1];

    // Cogemos el valor por defecto
    const defaultName = user.name !== undefined && user.name !== '' ? user.name : '';
    const html = this.initializeForm(user);

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, user);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${user.name} ${user.lastname}<br/>
          <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,
          // Ejemplo de if resumidos
          (user.active !== false) ? 375 : 400,
          '<i class="fas fa-edit"></i> Editar', // true
          (user.active !== false) ? '<i class="fas fa-lock"></i> Bloquear' : '<i class="fas fa-lock-open"></i> Desbloquear'
          
        ); // false
        if (result) {
          this.updateForm(html, user);
        } else if (result === false) {
          if(user.active == true) {
            this.blockForm(user);
          } else {
            this.unBlockForm(user);
          }
          
        }
        break;
      case 'block':
        this.blockForm(user);
        break;
      case 'unblock':
        this.unBlockForm(user);
        break;
      default:
        break;
    }
  }

//**************************************************************************************************
//                        Métodos para añadir un usuario                                                          
//**************************************************************************************************
                
private async addForm(html: string) {
  const result = await userFormBasicDialog('Añadir Usuario', html);
  this.addUser(result);
}

private addUser(result) {
  if (result.value) {
    const user: IRegisterForm = result.value;
    user.password= '123';
    user.active = false;


    this.userService.register(user).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        // Mandamos email para que se active
        this.userService.senEmailActive(res.user.id, user.email).subscribe(
          resultMail => {
            console.log('Email enviado');
            (resultMail.status) ? basicAlert(TYPE_ALERT.SUCCESS, resultMail.message) :  basicAlert(TYPE_ALERT.WARNING, resultMail.message);
          }
        )
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }
}

  //**************************************************************************************************
  //                    Métodos para actualizar usuario                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, user: any) {
    const result = await userFormBasicDialog('Modificar usuario', html);
    this.updateUser(result, user.id );
  }

  private updateUser(result, id: string,) {
    if (result.value) {
      const user = result.value;
      user.id = id;
      this.userService.update(user).subscribe((res: any) => {
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
          basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }


  //**************************************************************************************************
  //              Método para bloquear/desbloquear un usuario                                                           
  //**************************************************************************************************
  

  private blockUser(id: string) {
    this.userService.block(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private unBlockUser(id: string) {
    this.userService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(user: any) {


    const result =

      await optionsWithDetails(
        '¿Bloquear?',
        `Si bloqueas el item seleccionado, no se mostrará en la lista`,
        430,
        'No, no bloquear',
        'Si, bloquear'
      )

    if(result == false) {
      this.blockUser(user.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  private async unBlockForm(user: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista y podrás hacer compras`,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockUser(user.id);
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

}
