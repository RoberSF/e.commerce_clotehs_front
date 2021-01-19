import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shop-core/component/header/header.component';
import { NavbarComponent } from '@shop-core/component/navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent,HeaderComponent]
})
export class ComponentModule { }
