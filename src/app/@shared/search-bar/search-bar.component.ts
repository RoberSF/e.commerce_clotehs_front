import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  platform: string = ''
  @Output() searchValue: EventEmitter<Array<IProduct>>;

  constructor(public activatedRoute: ActivatedRoute) {

    // Con esto recogeríamos la plataforma de la url para mandarle al filtro
    activatedRoute.params.subscribe(params => {
      let busqueda = params['filter'];
      this.platform = busqueda
    })

    this.searchValue = new EventEmitter()
   }

  ngOnInit(): void {
  }

  search(value: any) {

    this.searchValue.emit(value)
  }

}
