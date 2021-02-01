import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IProductPageInfo } from '@shop/core/Interfaces/IProductPageInfo';
import { IInfoPage } from '@shop/core/Interfaces/IResultData';
import { closeAlert, loadData } from 'src/app/@shared/alerts/alerts';
import { ACTIVE_FILTERS } from 'src/app/@shared/constants/filter';
import { PRODUCTS_PAGES_INFO, TYPE_OPERATION } from 'src/app/@shared/constants/products.constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { SEARCH_PRODUCT_QUERY } from '@graphql/operations/query/product';
import { CategoriListService } from '../../../@shared/product-categori-list/product-categori-list.service';
import { TablePaginationService } from 'src/app/@shared/table-pagination/table-pagination.service';

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
  searchOpen = false;
  
  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute,private auth: AuthService, private categoriListService: CategoriListService,
    private paginationService: TablePaginationService) { }

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
      this.productsService.getByCategoria(this.selectPage, this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, this.productsPageInfo.categoriasId).subscribe( (data) => {
        this.asingResult(data)
      })
    }
  };

  private asingResult(data) {
    this.productList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }


  // 2 Recibe el dato del component de searchBar y se lo mando al table-pagintation
  search(value: string) {  

    this.loading = true;
    loadData('Cargando búsqueda', 'Casi estamos');

    const variables = {
      page: this.infoPage.page,
      itemsPerPage: this.infoPage.itemsPerPage,
      include: false,
      active: ACTIVE_FILTERS.ACTIVE,
      value: value,
      categoriasId: this.productsPageInfo.categoriasId
    }

    this.productsService.searchProductsByCategorias(SEARCH_PRODUCT_QUERY, variables, {}).subscribe( (data:any) => {
      this.productList = data.productSearch.products;
      closeAlert();
    })


  };

  clean() {
    this.searchOpen = false;
    this.loadData()
  }

}
