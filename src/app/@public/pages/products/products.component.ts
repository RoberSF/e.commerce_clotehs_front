import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IProductPageInfo } from '@shop/core/Interfaces/IGamesPageInfo';
import { IInfoPage } from '@shop/core/Interfaces/IResultData';
import { closeAlert, loadData } from 'src/app/@shared/alerts/alerts';
import { ACTIVE_FILTERS } from 'src/app/@shared/constants/filter';
import { PRODUCTS_PAGES_INFO, TYPE_OPERATION } from 'src/app/@shared/constants/products.constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = 'Título de la categoría';
  productList: Array<IProduct> = [];
  selectPage;
  infoPage: IInfoPage = {
    page: 1,
    pages: 8,
    total: 160,
    itemsPerPage: 20
  }
  productsPageInfo: IProductPageInfo;
  typeData: TYPE_OPERATION;
  loading: boolean;
  searchOpen = false
  
  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute,private auth: AuthService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( (params) => {
      this.loading = true;
      loadData('Loading', `<div class="lds-roller"><div>`);
      this.typeData = params.type;
      this.selectPage = 1; // Cada vez que se cargue la página empezamos a contar desde la pag 1
      // Estos valores vienen de la constante. Si no hubiera constante hab´ria que recuperar el id de alguna manera
      this.productsPageInfo = PRODUCTS_PAGES_INFO[`${params.type}/${params.filter}`]
      this.loadData() //cada vez que cambiemos de página haremos un "refresh" de la data
      this.loading = false;
    })
  }

  loadData() {
    if( this.typeData === TYPE_OPERATION.PRODUCTS) {
      // this.productService.getByPlatform(this.selectPage,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, this.gamesPageInfo.platformsIds ,false, true, true).subscribe((data) => {
      //   this.asingResult(data)
      //   return
      // })
    }
    // this.productService.getByLastUnitsOffers(this.selectPage,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, false, this.gamesPageInfo.topPrice, this.gamesPageInfo.stock, true, true).subscribe((data) => {
    //   this.asingResult(data)
    //   return
    // })
  };

  private asingResult(data) {
    this.productList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }

  search(value: string) {  

    // Asiganar array a this. IProduct
    this.productsService.getByPlatformSearch(this.selectPage,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, this.productsPageInfo.categorias, value).subscribe((data) => {
      this.searchOpen = true;
      this.productList = data.result
      return
    })

  };

  clean() {
    this.searchOpen = false;
    this.loadData()
  }

}
