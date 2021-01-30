import { TitleService } from '@admin/core/services/titleService.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { ProductsService } from 'src/app/services/products.service';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from '../../../@shared/alerts/values.config';
import { PRODUCT_LIST_QUERY, SEARCH_PRODUCT_QUERY } from '@graphql/operations/query/product';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { NgForm } from '@angular/forms';
import { SizeService } from '../../../services/size.service';
import { ProductSizeService } from '../../../services/product_size.service';
import { IProductSize } from '../../core/interfaces/IProductSize';
import { IProductColor } from '@admin/core/interfaces/IProductColor';
import { ColorService } from 'src/app/services/color.service';
import { ProductColorService } from '../../../services/product_color.service';
import { Observable } from 'rxjs/internal/Observable';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  query: DocumentNode = PRODUCT_LIST_QUERY;
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  filterActiveValue = 'ACTIVE';
  modal = false;
  edit = false;
  sizes;
  colors;
  product;
  reload$ = new EventEmitter<boolean>();
  searchValue$ = new EventEmitter<any>();
 
  register: IProduct = {
    name: '',
    categoria:'',
    description: '',
    price: 2.5,
    screenshoots: [],
    active: false,
    stock: 0.0,
    size: [],
    color: [],
    img: ''
  };

  constructor(private productsService: ProductsService, private titleService: TitleService, private sizeService: SizeService, public colorService: ColorService,
              public productSizeService: ProductSizeService, public productColorService: ProductColorService) { }

  ngOnInit(): void {

    this.sizeService.sizes().subscribe( (result: any) => {
      this.sizes = result.sizes
    })
   this.colorService.colors().subscribe( (result:any) => {
     this.colors = result.colors
   })

    this.titleService.updateTitle('Productos')
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'products',
      definitionKey: 'products',
      searchKey: 'productSearch'
    };
    this.include = false
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre'
      },
      {
        property: 'price',
        label: 'Precio'
      },
      {
        property: 'stock',
        label: 'Stock'
      },
      {
        property: 'img',
        label: 'Imagen'
      },
      {
        property: 'active',
        label: '¿Activo?'
      },
    ]
  }


  reload() {
    
    setTimeout( () => {
      this.reload$.emit(true);
    },3000)
    
  }

  async buttonsEdit($event) {

    // Coger la información para las acciones por separado
    const action = $event[0];
    const product = $event[1];
    this.product = $event[1];

    switch (action) {
      case 'add':
        // Añadir el item
        this.openModal('')
        break;
      case 'edit':
        this.openModal(product)
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${product.name} (${product.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.openModal(product)
        } else if (result === false) {
          this.blockForm(product);
        }
        break;
      case 'block':
        this.blockForm(product);
        break;
        case 'unblock':
          this.unBlockForm(product);
          break;
        case 'delete':
          this.deleteForm(product);
          break;
      default:
        break;
    }
  }


  public addProduct() {


      this.productsService.add(this.register).subscribe((res: any) => {
        if (res.status) {
          this.modal = false
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.addProductSize(res.product.size);
          this.addProductColor(res.product.size);
          this.reload();
          return;
        }
          basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    
  }

  public updateProduct(result: NgForm) {

    console.log(this.register);

    if (result.value) {
      this.productsService.update(this.product.id, this.register).subscribe((res: any) => {
        if (res.status) {
          console.log(res);
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.closeInfoModal();
          this.reload()
          return;
        } 

          basicAlert(TYPE_ALERT.WARNING, res.message);
  
      });
    }
  }

  //**************************************************************************************************
  //                                     Bloquear - desbloquear                                                           
  //**************************************************************************************************
  
  private async blockForm(product: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockProduct(product.id);
    }
  }

  private async blockProduct(id: string) {

    this.productsService.block(id).subscribe( async (res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private unBlockProduct(id: string) {
    this.productsService.unBlock(id).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        this.reload()
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

//**************************************************************************************************
//                        Borrar product - product_size - product_color                                                           
//**************************************************************************************************


  private async deleteForm(product: any) {


    const result =

      await optionsWithDetails(
        'Borrar?',
        `Si borras el item seleccionado se eliminará de la base de datos`,
        500,
        'No, no borrar',
        'Si, borrar'
      ) 

    if(result == false) {
      this.deleteProduct(product.id);
      this.deleteProductColor(product.id);
      this.deleteProductSize(product.id);
      this.reload();
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  deleteProduct(id: string) {

    this.productsService.delete(id).subscribe((res: any) => {
      if (res.status) {
        this.modal = false
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
        basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  deleteProductSize(productId: string) {

      this.productSizeService.delete(productId).subscribe()
  }

  deleteProductColor(productId: string) {

      this.productColorService.delete(productId).subscribe()
  }

  private async unBlockForm(product: any) {


    const result =

      await optionsWithDetails(
        '¿Desloquear?',
        `Si desbloqueas el item seleccionado, se mostrará en la lista `,
        500,
        'No, no desbloquear',
        'Si, desbloquear'
      ) 

    if(result == false) {
      this.unBlockProduct(product.id);
      this.reload()
    } else {
      basicAlert(TYPE_ALERT.WARNING, 'Algo sucedió mal');
    }
  }

  //**************************************************************************************************
  //                    Open - close modal                                                           
  //**************************************************************************************************
  

  openModal(product) {

    if(product === '') {
      
      this.modal = true
      this.register = {
        name: '',
        categoria:'',
        description: '',
        price: 1.5,
        screenshoots: [],
        active: false,
        stock: 0,
        size: [],
        color: []
      };
    } 
    else {
      this.modal = true
      this.edit = true
      this.register = {
        name: product.name ,
        categoria: product.categoria,
        description: product.description,
        price: product.price,
        screenshoots: product.screenshoots,
        active: product.active,
        stock: product.stock,
        size: product.size,
        color: product.color
      };
    
    }

  }

  closeInfoModal() {
    this.modal = false
  }


  onChange(event, id, type) {

    if( type === 'size'){

      if( event.target.checked) {

        if(this.register.size.length <= 0 ) {
          this.register.size.push(id)
          return
        }

        this.register.size.map( (item) => {

          if( item !== id && this.register.size.length -1 === this.register.size.indexOf(item)) {
            this.register.size.push(id)
          }
        })
      }
      
      if(event.target.checked !== true ) {
        this.register.size.map( (item) => {
          if(item === id) {
            this.register.size.splice(this.register.size.indexOf(item), 1 );
          }
        })
      }
    }

    if ( type === 'color') {


      if( event.target.checked) {

        if(this.register.color.length <= 0 ) {
          this.register.color.push(id)
          return
        }

        this.register.color.map( (item) => {

          if( item !== id && this.register.color.length -1 === this.register.color.indexOf(item)) {
            this.register.color.push(id)
          }
        })
      }
      
      if(event.target.checked !== true ) {
        this.register.color.map( (item) => {
          if(item === id) {
            this.register.color.splice(this.register.color.indexOf(item), 1 );
          }
        })
      }
    }
    

}

  onActive(value) {
      this.register.active = value;
  }

  addProductSize(productSize) {

    productSize.map( (item) => {
      const product_size: IProductSize = {
        productId: productSize.product.id,
        sizeId: item,
        active: true
      }

      this.productSizeService.add(product_size).subscribe()
    })
  }

  addProductColor(productColor) {

    productColor.map( (item) => {
      const product_color: IProductColor = {
        productId: productColor.product.id,
        colorId: item,
        active: true
      }

      this.productColorService.add(product_color).subscribe()
    })
  }

  search(value: string) {

    let searchObject = [ value, SEARCH_PRODUCT_QUERY]

    this.searchValue$.emit(searchObject);

  }




}
