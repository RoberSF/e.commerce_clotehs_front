import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../../guards/admin.guard';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'genres',
        loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule)
      },
      {
        path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule)
      },
      {
        path: 'post-edit',
        loadChildren: () => import('./post-edit/post-edit.module').then(m => m.PostEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
