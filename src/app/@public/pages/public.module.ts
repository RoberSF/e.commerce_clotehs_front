import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { FooterComponent } from '@shop/core/component/footer/footer.component';
import { SidebarComponent } from '@shop/core/component/sidebar/sidebar.component';
import { ShoppingCartModule } from '../core/component/shopping-cart/shopping-cart.module';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../core/component/component.module';


@NgModule({
  declarations: [PublicComponent,FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ShoppingCartModule,
    RouterModule,
    ComponentModule
  ]
})
export class PublicModule { }
