import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopGuard } from 'src/app/guards/shop.guard';
import { PublicComponent } from './public.component';


//**************************************************************************************************
//                            Lazy loading                                                           
//**************************************************************************************************

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'blog/:id',
        loadChildren: () => import('./posts/details/details.module').then(m => m.DetailsPostModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./forms/checkout/checkout.module').then(m => m.CheckoutModule),
        canActivate: [ShopGuard],
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [ShopGuard],
      },
      {
        path: 'products/details/:id',
        loadChildren: () => import('./products/details/details.module').then(m => m.DetailsModule)
      },
      {
        path: 'products/:type/:filter',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./forms/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./forms/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'active/:token',
        loadChildren: () => import('./forms/active/active.module').then(m => m.ActiveModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forms/forgot/forgot.module').then(m => m.ForgotModule)
      },
      {
        path: 'reset/:token',
        loadChildren: () => import('./forms/change-password/change-password.module').then(m => m.ChangePasswordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
