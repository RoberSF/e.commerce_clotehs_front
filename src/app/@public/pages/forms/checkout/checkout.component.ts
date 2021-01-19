import { Component, OnInit} from '@angular/core';
import { IMeData } from '../../../core/Interfaces/ISession';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { take } from 'rxjs/internal/operators/take';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { infoEventAlert } from 'src/app/@shared/alerts/alerts';
import { CustomerService } from '../../../../services/stripe/customer.service';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { loadData } from '../../../../@shared/alerts/alerts';
import { ChargesService } from '../../../../services/stripe/charges.service';
import { IPayment } from '../../../core/Interfaces/stripe/IStripeDescription';
import { CURRENCY_CODE } from '../../../../@shared/constants/config';
import { IShoppingCart } from '../../../core/Interfaces/IShoppingCart';
import { ICharge } from '../../../core/Interfaces/stripe/ICharge';
import { IMail } from '../../../core/Interfaces/IMail';
import { MailService } from '../../../../services/mail.service';
import { IStock } from '@shop/core/Interfaces/IStock';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit  {

  meData: IMeData;
  key = environment.stripePublicKey;
  address = '';
  available = false;
  blockOnce = false;
  paypal = false;
  stripe = true;
  public payPalConfig?: IPayPalConfig;


  constructor(private authService: AuthService, 
    private router: Router, 
    private stripePaymentService: StripePaymentService,
    private shoppingCartService: ShoppingCartService,
    private customerService: CustomerService,
    private chargesService: ChargesService,
    private mailService: MailService) {

      //****************************************************************************************************************************************************************************************************
      //                         Trabajamos desde el constructor ya que la librería de Anatz funciona así. 
      //                                           Explicación en anotaciones   
      //                         Realizamos el pago así como otras operaciones de validación y actualización a tiempo real del stock                                          
      //****************************************************************************************************************************************************************************************************
      
    
    // ****************************************************************************************************************************************************************************************************
    // Escuchamos el observable para recoger mis datos de usuario para que sea válido efectuar el pago
    this.authService.accessVar$.subscribe( (data: IMeData) => { 
      // Comprobamos el status para validación y o redirigir. Comprobamos que haya sesión iniciada(que estemos registrados)
      if ( !data.status) {
          this.router.navigate( ['/login']);
          return
      }
      this.meData = data;
    })



    // ****************************************************************************************************************************************************************************************************
    // Comprobamos que el carrito tenga elementos para pagar
    this.shoppingCartService.itemsVar$.pipe(take(1)).subscribe( (shoppingCart: IShoppingCart) => {

      if ( this.shoppingCartService.shoppingCart.total === 0) {
        this.available = false;
        this.notAvailableProducts();
      }
    })
  

    // ****************************************************************************************************************************************************************************************************
    // Empezamos con el proceso de pago
    // El servicio es creado directamente por la librería de anatz

    // Mandamos crear el token de stripe y comprobamos que se ha creado para validar
    this.stripePaymentService.cardTokenVar$.pipe(take(1)).subscribe( (token: string) => { //take() hace que sólo se ejecute una vez, si no puede que el pago se hiciera varias veces
      if ( token.indexOf('tok_') > -1 && this.meData.status && this.address !== '') {
        
        if ( this.shoppingCartService.shoppingCart.total === 0 && this.available === false) {
          this.available = false;
          this.notAvailableProducts();
        }
          // Podemos enviar los datos
          // Descripción del pedido. Tenemos que crear función en el carrito
          // Divisa
          // Cliente de stripe
          // Total a pagar
          //**************************************************************************************************
          // Descripción del pedido en función del carrito
          this.shoppingCartService.orderDescription();

          //**************************************************************************************************
          // Almacenar la información para enviar a stripe creando el objeto
          const payment: IPayment = {
            token,
            amount: this.shoppingCartService.shoppingCart.total.toString(),
            description: this.shoppingCartService.orderDescription(),
            customer: this.meData.user.stripeCustomer,
            currency: CURRENCY_CODE
           };

           // **************************************************************************************************
           // Recorremos el array del carrito para la actualización a tiempo real del stock
           const stockManage: Array<IStock> = [];
           this.shoppingCartService.shoppingCart.products.map( (item: IProduct) => {
             stockManage.push( {
               id: +item.id,
               increment: item.qty * (-1)
             })
           })

           // Desloquea el botón para hacer el pago
           this.blockOnce = true;

           loadData('Realizando el pago', 'Espera mientras procesamos la información');

          // Enviar la información a la api para procesar el pago
          this.chargesService.pay(payment, stockManage).pipe(take(1)).subscribe( async (result: {status: boolean, message: string, charge: ICharge}) => {
            if ( result.status) {
              await infoEventAlert('Pedido realizado correctamente', 'Pedido efectuado correctamente. ¡¡Gracias por tu compra!!', TYPE_ALERT.SUCCESS);
              this.sendEmail(result.charge);
              this.router.navigate(['/orders']);
              this.shoppingCartService.clear();
            } else {
              await infoEventAlert('Pedido no se realizado', '¡¡Inténtelo de nuevo por favor!!', TYPE_ALERT.SUCCESS);
            }
            // Una vez realizado el pago se bloquea el botón
            this.blockOnce = false;
          })
      }
    })
   }


  ngOnInit() {

    this.initConfig();
    //****************************************************************************************************************************************************************************************************
    //                              Redirecciones y guardar en el storage( info y rutas) para cuando me logueo antes de hacer el pago                                                           
    //****************************************************************************************************************************************************************************************************
    
    this.authService.start();
    // Después de redirigir, al recargar que vea si hay info del checkout y que la rellene automáticamente
    if ( localStorage.getItem('address')) {
      // La asignamos para el envío nuevamente
      this.address = localStorage.getItem('address')
      // Lo eliminamos del localstorage para que no haya conflictos en el futuro
      localStorage.removeItem('address')
    }
    // Inicializamos el carrito para poder enviar la información con el montante final
    this.shoppingCartService.initializeCart();
    // Eliminamos la ruta puesta después de redirigir tras habernos creado en stripe
    localStorage.removeItem('route_after_login')

    this.blockOnce = false;
    if ( this.shoppingCartService.shoppingCart.total === 0) {
      this.available = false;
      this.notAvailableProducts();
    } else {
      this.available = true
    }
  }

  addPaypalScript() {
    return new Promise((resolve,reject) => {
      let scripttagelement = document.createElement('script');
      scripttagelement.src = 'https://paypalobjects.com/api/checkout.js';
      scripttagelement.onload = resolve;
      document.body.appendChild(scripttagelement)
    });
  }


  async notAvailableProducts() {
    this.shoppingCartService.closeNav();
    this.available = false;
    await infoEventAlert('Acción no disponible', 'Añade productos al carrito');
    this.router.navigate(['/'])
  }

  async sendData() {
    // Si no soy cliente de stripe no puede hacer el pago por lo que debemos registrar al cliente
    if ( this.meData.user.stripeCustomer === null ) {
      // Alerta para mostrar info respecto lo vamos a añadir a stripe
      await infoEventAlert('Cliente no existe', 'Necesitamos un cliente para realizar el pago')
      loadData('Procesando la información', 'Creando el cliente')
      // El nombre del cliente concatenado
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`;
      // Llamada a la api de graphql para crear cliente. Sólo cogemos un click con el take(1). Nuestra api ya se encarga de guardarlo en nuestra DB
      // El cliente se creará si en la api de stripe no existe el usuario
      this.customerService.createClientStripe(stripeName, this.meData.user.email).pipe(take(1)).subscribe( async (result: {status: boolean, message: string}) => {
        if ( result.status ) {
          await infoEventAlert('Cliente añadido al usuario', 'Reiniciar la sesión', TYPE_ALERT.SUCCESS);
          // Guardamos esta info para tras el redireccionar de venir de stripe tengamos la info del envío
          localStorage.setItem('address', this.address)
          // Guardamos la ruta para tras el redireccionar volvamos al checkout
          localStorage.setItem('route_after_login', this.router.url)
          this.authService.resetSession()
        } else {
          await infoEventAlert('Cliente no añadido al usuario', result.message, TYPE_ALERT.WARNING);

        }
      })
      return
    }
    // La función ya viene creada con la librería. Necesitamos configurar los enviroments para que coja la apiKey de stripe
    this.stripePaymentService.takeCardToken(true);
  }

  sendEmail(charge: ICharge) {
    
    const mail: IMail = {
      to: charge.receiptEmail,
      subject: 'Confirmación del pedido',
      html: `
      El pedido se ha realizado correctamente. Puedes consultarlo en <a href="${charge.receiptUrl}" target="_blanck"></a>
      `
    }
    this.mailService.sendEmail(mail).pipe(take(1)).subscribe();
  }

  payMethod(method) {
    
    if ( method === 'paypal' ) {
      //paypal.Buttons().render(this.child.nativeElement)
      this.paypal = true;
      this.stripe = false
    }

    if( method === 'stripe') {
      this.stripe = true;
      this.paypal = false
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AbE0JovguFMYFBXv3gkf3GjFWZWAK7KBiVnsyXme_CZl8Vth6JeT6nUhtY4JrZHrdfpaHXSf58wPBWgs',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        // console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      infoEventAlert('Transaction correctamente cancelada','')
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}

// paypalconfig: any = {
//   env: 'sandbox',
//   client: {
//     sandbox: 'AbE0JovguFMYFBXv3gkf3GjFWZWAK7KBiVnsyXme_CZl8Vth6JeT6nUhtY4JrZHrdfpaHXSf58wPBWgs',
//     production: 'EKxAHNKCy8PzPPK40ms1b1Tp9JMYS9HubQQukTmk26cXi-CWZy4yc2yQU3-dPzVx981TmWTEP-R6rV40'
//   },
//   commit:true,
//   payment: (data,actions) => {
//     return actions.payment.create({
//       payment: {
//         transactions: [
//           { amount: {total: 10, currency: 'EUR'}}
//         ]
//       }
//     })
//   },
//   onAuthorize: (data, actions) => {
//     return actions.payment.execute().then( (payment) => {
//       console.log('Pago efectuado');
//       console.log(payment);
//     })
//   }
// }