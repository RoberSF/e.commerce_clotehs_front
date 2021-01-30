import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { loadData, closeAlert } from 'src/app/@shared/alerts/alerts';
import { SettingsService } from '../../../services/setting.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];​ 
  productList; 
  listOne;
  loading: boolean;

  constructor( public auth: AuthService, private productsService:ProductsService, private settingsServive: SettingsService) { }

  ngOnInit(): void {
    
    this.settingsServive.loadSettings()
    this.loading = true;
    loadData('Loading', 'Allá vamos!!');
    this.productsService.getHomePage().subscribe( (data: any) => {
      this.listOne = data.topPrice
      this.items = this.manageCarousel(data.carousel)
      closeAlert();
      this.loading = false;
    })

  }


  private manageCarousel(list) {
    const itemsValues: Array<ICarouselItem> = [];
    list.map( (item) => {
          itemsValues.push({
            id: item.id,
            title: item.name,
            description: item.description,
            background: item.img,
            url: '/games/details/'.concat(item.id)
          })
        })
      return itemsValues
      }

}


//**************************************************************************************************
//                     Queries individuales antes de hacerla en una sola                                                           
//**************************************************************************************************
      
    // Traer los valores cargados en el carousel.json u otros 
    // this.productService.getByLastUnitsOffers(1, 3, ACTIVE_FILTERS.ACTIVE, true, -1, 40).subscribe ( (data) => {
    //   data.result.map( (item: IProduct) => {
    //     this.items.push({
    //       id: item.id,
    //       title: item.name,
    //       description: item.description,
    //       background: item.img,
    //       url: ''
    //     })
    //   })
    //   // console.log(this.items);
    // });


    // this.productService.getByLastUnitsOffers(1,4, ACTIVE_FILTERS.ACTIVE, true, 40, -1, false, true).subscribe((data) => {
    //   this.listTwo = data.result
    // })