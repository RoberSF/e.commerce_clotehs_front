import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilosophyComponent } from './filosophy/filosophy.component';
import { CultureComponent } from './culture/culture.component';
import { ValorsComponent } from './valors/valors.component';
import { ReturnsComponent } from './returns/returns.component';
import { AboutComponent } from './about.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { MapComponent } from './map/map.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { WarrantyComponent } from './warranty/warranty.component';


const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'filosophy',
    component: FilosophyComponent
  },
  {
    path: 'culture',
    component: CultureComponent
  },
  {
    path: 'valors',
    component: ValorsComponent
  },
  {
    path: 'refunds',
    component: ReturnsComponent
  },
  {
    path: 'customerServices',
    component: CustomerServiceComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent
  },
  {
    path: 'warranty',
    component: WarrantyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
