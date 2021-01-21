import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../../guards/admin.guard';

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
        path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule)
      },
      {
        path: 'sizes',
        loadChildren: () => import('./sizes/sizes.module').then(m => m.SizesModule)
      },
      {
        path: 'colors',
        loadChildren: () => import('./colors/colors.module').then(m => m.ColorsModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
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
