import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';


//**************************************************************************************************
//   Email patern para añadir al formulario. Ojo a las / / del principio y final para que lo pille                                                           
//**************************************************************************************************


const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

//**************************************************************************************************
//                 Configuraciones de alertas genéricas                                                           
//**************************************************************************************************

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({ // Es un código basico para extender a otras alertas y rehutilizar código
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  });



export async function formBasicDialog(
    title: string,
    html: string,
    property: string
  ) {
    return await swalWithBasicOptions(title, html).fire({ // Utilizamos el mixin
      preConfirm: () => {
        const value = (document.getElementById('name') as HTMLInputElement).value;
        if (value) {
          return value;
        }
        Swal.showValidationMessage(
          'Tienes que añadir un género para poder almacenarlo'
        );
        return;
      },
    });
  }

  export async function formColorDialog(
    title: string,
    html: string,
    property: string
  ) {
    return await swalWithBasicOptions(title, html).fire({ // Utilizamos el mixin
      preConfirm: () => {
        const value = [
          (document.getElementById('name') as HTMLInputElement).value,
          (document.getElementById('code') as HTMLInputElement).value,
          (document.getElementById('active') as HTMLInputElement).value
        ];
        if (value) {
          return value;
        }
        Swal.showValidationMessage(
          'Tienes que añadir un color para poder almacenarlo'
        );
        return;
      },
    });
  }

  


//**************************************************************************************************
//                             Formulario para user con validaciones de formulario                                                       
//**************************************************************************************************

  export async function userFormBasicDialog(title: string,html: string) {

    return await swalWithBasicOptions(title, html).fire({
      preConfirm: () => {
        let error = '';
        const name = (document.getElementById('name') as HTMLInputElement).value;
        if (!name) {
          error += 'Usuario es obligatorio<br/>';
        }
        const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
        if (!lastname) {
          error += 'Apellido es obligatorio<br/>';
        }
        const email = (document.getElementById('email') as HTMLInputElement).value;
        if (!email) {
          error += 'Email es obligatorio<br/>';
        }
        if (!EMAIL_PATTERN.test(email)) {
          error += 'Email no es correcto en su formato';
        }
        const role = (document.getElementById('role') as HTMLInputElement).value;
        if (error !== '') {
          Swal.showValidationMessage(
            error
          );
          return;
        }
        return {
          name,
          lastname,
          email,
          role,
          birthday: new Date().toISOString()
        };
      },
    });
  }


  export async function formProductDialog(title: string,html: string) {

    return await swalWithBasicOptions(title, html).fire({
      preConfirm: () => {
        let error = '';
        const name = (document.getElementById('name') as HTMLInputElement).value;
        if (!name) {
          error += 'Usuario es obligatorio<br/>';
        }
        const categoria = (document.getElementById('categoria') as HTMLInputElement).value;
        if (!categoria) {
          error += 'categoria es obligatoria<br/>';
        }
        const description = (document.getElementById('description') as HTMLInputElement).value;
        if (!description) {
          error += 'description es obligatorio<br/>';
        }
        const price = +(document.getElementById('price') as HTMLInputElement).value;
        if (!price) {
          error += 'price es obligatorio<br/>';
        }
        // const active = (document.getElementById('active') as HTMLInputElement).value;
        // if (!active) {
        //   error += 'active es obligatorio<br/>';
        // }
        // const stock = (document.getElementById('stock') as HTMLInputElement).value;
        // if (!stock) {
        //   error += 'stock es obligatorio<br/>';
        // }
        if (error !== '') {
          Swal.showValidationMessage(
            error
          );
          return;
        }
        return {
          name,
          categoria,
          description,
          price,
          // active,
          // stock
        };
      },
    });
  }


  //**************************************************************************************************
  //                              Opciones con detalles                                                           
  //**************************************************************************************************
  
  export async function optionsWithDetails(
    title: string,
    html: string,
    width: number | string,
    confirmButtonText: string = '',
    cancelButtonText: string = ''
  ) {
    return await Swal.fire({
      title,
      html,
      width: `${width}px`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#dc3545',
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log('Editar');
        return true;
      } else if (result.dismiss.toString() === 'cancel') {
        console.log('Bloquear');
        return false;
      }
    });
  }


  //**************************************************************************************************
  //                      Loading( no se cierra automaticamente, tengo que decírselo)                                                       
  //**************************************************************************************************
  

  export const loadData = (title: string, html: string) => {
    Swal.fire({
      title,
      html,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  };

  export const closeAlert = () => {
    Swal.close();
  };

  export const infoEventAlert = async (title: string, html: string, typeAlert: TYPE_ALERT = TYPE_ALERT.WARNING) => {
    return await Swal.fire({
      title,
      html,
      icon: typeAlert,
      preConfirm: () => {
        return true
      },
    });
  };
