import { Component, OnInit } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../../services/users.service';
import { ProductService } from '../../../services/product.service';
import { loadData, closeAlert } from 'src/app/@shared/alerts/alerts';
import { SettingsService } from '../../../services/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];​ 
  productList; 
  listOne;
  listTwo;
  listThree;
  loading: boolean;
  modal = this.auth.modal

  constructor(private apiService: ApiService, public auth: AuthService, 
                private userService: UsersService, private productService:ProductService, private settingsServive: SettingsService) { }

  ngOnInit(): void {
    
    this.settingsServive.loadSettings()
    this.loading = true;
    loadData('Loading', 'Allá vamos!!');
    this.productService.getHomePage().subscribe( (data: any) => {
      this.listOne = data.ps4
      this.listTwo = data.topPrice
      this.listThree = data.pc
      this.items = this.manageCarousel(data.carousel.products)
      closeAlert();
      this.loading = false;
    })


    //Obtenemos la data del servicio
    // this.auth.login('test1@gmail.com', '123').subscribe((data) => {
    //   console.log(data);
    // });

    // Obtenemos la información de los usuarios
    this.userService.getUsers(1,2).subscribe((data) => {
      // console.log(data);
    })

    this.auth.getMe().subscribe((data) => {
      // console.log(data);
    })
  }


  private manageCarousel(list) {
    const itemsValues: Array<ICarouselItem> = [];
    list.map( (item) => {
          itemsValues.push({
            id: item.id,
            title: item.product.name,
            description: item.platform.name,
            background: item.product.img,
            url: '/games/details/'.concat(item.id)
          })
        })
      return itemsValues
      }

  fakeRandomProductList() {
    const list = [];
    const arrayMax = 4;
    const limit = this.productList.length;
    for (let i = 0; i < arrayMax; i++) {
      list.push(this.productList[Math.floor(Math.random() * limit)])
    }
    return list
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