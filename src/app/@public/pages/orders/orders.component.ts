import { Component, OnInit } from '@angular/core';
import { ICharge } from '@shop/core/Interfaces/stripe/ICharge';
import { CURRENCY_SELECTED } from '../../../@shared/constants/config';
import { IMeData } from '../../core/Interfaces/ISession';
import { AuthService } from '../../../services/auth.service';
import { ChargesService } from '../../../services/stripe/charges.service';
import { take } from 'rxjs/internal/operators/take';
import { loadData, closeAlert } from '../../../@shared/alerts/alerts';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  currencySymbol = CURRENCY_SELECTED;
  meData: IMeData;
  strartingAfter =  '';
  hasMore: boolean = false;
  chargesList: Array<ICharge> = [];
  loading = true;
  loadMoreBtn = false;

  constructor(private authService: AuthService,
              private chargesService: ChargesService) { 
  
      this.authService.accessVar$.pipe(take(1)).subscribe( (meData:IMeData) => {
        this.meData = meData;
        // Si la sesión existe cargarla con el cliente
        if (this.meData.user.stripeCustomer !== '') {
          this.loadChargesData();
        }
      })
              }

  ngOnInit(): void {
    this.authService.start();
  }

  loadChargesData() {
    loadData('Cargando datos...', 'Espero mientras carga');
    this.chargesService.chargesListByCustomer(this.meData.user.stripeCustomer, 10, this.strartingAfter, '')
      .pipe(take(1)).subscribe( (data: {hasMore: boolean, charges: Array<ICharge>}) => {
        this.chargesList = data.charges;
        this.hasMore = data.hasMore;
        closeAlert();
        this.loading = false;
        if ( data.hasMore ) {
          // Cogemos el último elemento del array para asignar el id
          this.strartingAfter = data.charges[data.charges.length -1].id;
          this.loadMoreBtn = true
        } else {
          this.loadMoreBtn = false;
          this.strartingAfter = ''
        }
      })
  }



}
