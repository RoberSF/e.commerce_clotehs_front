import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
// import { PRODUCT_LAST_UNITS_OFFERS_QUERY, PRODUCT_BY_PLATFORM_QUERY } from '@graphql/operations/query/product';
import { ACTIVE_FILTERS } from '../@shared/constants/filter';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { HOME_PAGE } from '@graphql/operations/query/homePage';
// import { PRODUCT_DETAILS, PRODUCT_RANDOM } from '../@graphql/operations/query/product';
import { SUBSCRIPTIONS_PRODUCT_SELECT_STOCK } from '../@graphql/operations/subscriptions/product';
import { SEARCH_PRODUCTO_PLATFORM } from '../@graphql/operations/query/search';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

// getByPlatform(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
//                 platform: Array<string>, random: Boolean = false, showInfo: boolean = false, showPlatform: boolean = false) {
//     return this.get(PRODUCT_BY_PLATFORM_QUERY,{page, itemsPage, active, platform ,random, showInfo, showPlatform }).pipe(map( (result: any) => {
//         const data =  result.productsPlatformsRandom
//         return {
//           info: data.info,
//           result: this.manageInfo(data.products)
//         }
        
//       }));
// }


// getByLastUnitsOffers(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
//                         random: Boolean = false, topPrice: number = -1, lastUnits: number = -1, showInfo: boolean = false, showPlatform: boolean = false) {
//     return this.get(PRODUCT_LAST_UNITS_OFFERS_QUERY,{page, itemsPage, active, random, topPrice, lastUnits, showInfo, showPlatform}).pipe(map( (result: any) => {
//       const data =  result.productsOffersLast;
//         return {
//           info: data.info,
//           result: this.manageInfo(data.products)
//         } 
//       }));
// }

getHomePage() {
  return this.get(HOME_PAGE, {showPlatform: true}).pipe(map( (result:any) => {
      return {
        carousel: result.carousel,
        ps4: this.manageInfo(result.ps4.products, true),
        pc: this.manageInfo(result.pc.products, true),
        topPrice: this.manageInfo(result.topPrice35.products, true)
      };
  }))
}


// getItem(id: number) {

//   return this.get( PRODUCT_DETAILS, { id: id}, {}, false).pipe(map( (result: any) => {
//     const data =  result.productDetails;
//     return {
//       product: this.setInObject(data.product, true),
//       screenshoots: data.product.product.screenshoot, //ojo al doble product que es a causa del fragment
//       similarProducts: data.product.similarProducts
//     } 
//   }))

// }

// itemsRandom() {
//   return this.get(PRODUCT_RANDOM).pipe(map((result:any) => {
//     const data = result.randomItems.products;
//     return this.manageInfo(data, true)
//   }))
// }

stockUpdateListener(id: number) {
  return this.subscription(SUBSCRIPTIONS_PRODUCT_SELECT_STOCK, { id }).pipe(map( (result: any) => {
    return result.selectProductStockUpdate
  }));
}

  getByPlatformSearch(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, platform: Array<string>, searchValue: string) {
    return this.get(SEARCH_PRODUCTO_PLATFORM, { page, itemsPage, active, platform, searchValue }).pipe(map((result: any) => {
      const data = result.productsPlatformsSearch
      return {
        info: data.info,
        result: this.manageInfo(data.products)
      }

    }));
  }


private setInObject(productObject, showDescription) {
  return {
    // Tener en cuenta la interfaceIProduct
    id: productObject.id,
    img: productObject.product.img,
    name: productObject.product.name,
    rating: productObject.product.rating,
    description: (productObject.platform && showDescription) ? productObject.platform.name : '',
    qty: 1,
    price: productObject.price,
    stock: productObject.stock
  };
}



private manageInfo(listProducts, showDescription = true) {
        const resultList: Array<IProduct> = [];
        listProducts.map( (productObject) => {
          // resultList.push( this.setInObject(productObject, showDescription)
          // )
        })
        return resultList;
}


}
