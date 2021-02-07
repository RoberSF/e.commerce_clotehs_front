import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map, take } from 'rxjs/operators';
import { ISale } from '@shop/core/Interfaces/ISale';
import { ADD_SALE } from '../@graphql/operations/mutation/sale';
import { AuthService } from './auth.service';
import { IMeData } from '@shop/core/Interfaces/ISession';
import { Router } from '@angular/router';
import { MailService } from './mail.service';
import { IMail } from '@shop/core/Interfaces/IMail';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends ApiService {

meData: IMeData;
 
  constructor(apollo: Apollo, public authService: AuthService, private router: Router, private mailService: MailService, private shoppingCartService: ShoppingCartService) {
    super(apollo);

    this.authService.accessVar$.subscribe( (data: IMeData) => { 
        if ( !data.status) {
            this.router.navigate( ['/login']);
            return
        }
        this.meData = data;
      })
}


addOperation(info: any, type: string) {
    
  const sale = this.manageOperation(info, type)
      return this.set(ADD_SALE,{sale}, {}).pipe(map( (result: any) => {
          return result.addSale;
        }));
}

// update(id: string, tag: string) {
//   return this.set(
//     MODIFY_TAG,
//     {
//       id,
//       tag
//     }, {}).pipe(map( (result: any) => {
//       return result.updateTag;
//     }));
// }

// block(id: string) {
//   return this.set(
//     BLOCK_TAG,
//     {
//       id
//     }, {}).pipe(map( (result: any) => {
//       return result.blockTag;
//     }));
// }

// unBlock(id: string) {
//   return this.set(UNBLOCK_TAG,{id}, {}).pipe(map( (result: any) => {
//       return result.unBlockTag;
//     }));
// }

manageOperation(sale: any, type: string) {


    if ( type === 'stripe') {
  
        const operation: ISale = {
            operationId: sale.id,
            emailAdress: this.meData.user.email,
            clientName: this.meData.user.name,
            clientPlatformId: sale.customer,
            url: sale.receiptUrl ,
            date: sale.created ,
            status: sale.status === 'succeeded' ? 'COMPLETED' : 'NOT COMPLETED',
            platform: 'stripe',
            totalOperation: sale.amount.toString(),
            active: true,
            description: this.manageDescription()
        }
        //console.log(operation);
        this.sendEmail(operation)
        return operation
    }

    if ( type === 'paypal') {

      const operation: ISale = {
            operationId: sale.id,
            emailAdress: this.meData.user.email,
            clientName: this.meData.user.name,
            clientPlatformId: sale.payer.payer_id,
            url: sale.links[0].href ,
            date: sale.create_time ,
            status: sale.status,
            platform: 'paypal',
            totalOperation: sale.purchase_units[0].amount.value,
            active: true,
            description: this.manageDescription()
        }
        this.sendEmail(operation)
        return operation
    }
 
}

manageDescription() {

  let descriptionArray = []

  this.shoppingCartService.shoppingCart.products.map( (item) => {


    let description = {
      name: item.name,
      qty: item.qty.toString(),
      price: item.price.toString()
    }
    descriptionArray.push(description)
  })

  return descriptionArray
}

sendEmail(operation: ISale) {
    
    const mail: IMail = {
      to: [operation.emailAdress, 'onlineshoprsf@gmail.com'],
      subject: 'Confirmación del pedido',
      html: `
      <h6> Gracias por confiar en nosotros!! </h6>
      <p> Estamos muy contentos de que hayas realizado el pedido con nosotros</p>
      <p>El pedido se ha realizado correctamente. Puedes consultarlo aquí: <a href="${operation.url}" target="_blanck">Click</a></P>
      <p> Esperamos que disfrute de su compra</p>
      <p> Muchas gracias!! </p>
      <p> Saludos de parte de todo el equipo! :)</p>
      `
    }
    this.mailService.sendEmail(mail).pipe(take(1)).subscribe();
  }

}


