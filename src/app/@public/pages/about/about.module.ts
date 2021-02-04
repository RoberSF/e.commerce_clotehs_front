import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { FilosophyComponent } from './filosophy/filosophy.component';
import { CultureComponent } from './culture/culture.component';
import { ValorsComponent } from './valors/valors.component';
import { ReturnsComponent } from './returns/returns.component';
import { AboutComponent } from './about.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { WarrantyComponent } from './warranty/warranty.component';


@NgModule({
  declarations: [FilosophyComponent, CultureComponent, ValorsComponent, ReturnsComponent, AboutComponent, CustomerServiceComponent, MapComponent, DeliveriesComponent, WarrantyComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCX-_SYajB1VHjleeMLQxj5GhVhH_8JMeo'  }) , // Necesario para la implementación de Google Maps
  ]
})
export class AboutModule { }
