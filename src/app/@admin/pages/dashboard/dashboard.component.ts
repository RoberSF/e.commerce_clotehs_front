import { IGeneralInfo } from '@admin/core/interfaces/IGeneralInfo';
import { TitleService } from '@admin/core/services/titleService.service';
import { Component, OnInit } from '@angular/core';
import { loadData } from 'src/app/@shared/alerts/alerts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { closeAlert } from '../../../@shared/alerts/alerts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: Array<IGeneralInfo> = [
    {
      icon: 'fas fa-users',
      title: 'Usuarios',
      value: 'users'
    },
    {
      icon: 'fas fa-tint',
      title: 'Colores',
      value: 'colors'
    },
    {
      icon: 'fas fa-microblog',
      title: 'Posts',
      value: 'posts'
    },
    {
      icon: 'fas fa-atlas',
      title: 'Productos',
      value: 'products'
    },
    {
      icon: 'fas fa-tags',
      title: 'Tags',
      value: 'tags'
    },
    {
      icon: 'fas fa-angle-double-up',
      title: 'Tallas',
      value: 'tallas'
    },
    {
      icon: 'fas fa-address-book',
      title: 'Categorias',
      value: 'categorias'
    }
  ];
  loading = true

  constructor(private titleService: TitleService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    loadData('Cargando datos', 'Espera mientras se cargan las estadísticas')
    this.titleService.updateTitle('Inicio');
    this.loading = true;
    this.dashboardService.getStats().subscribe( (result: any) => {
      this.loading = false
      this.items.map((item) => {
        item.value = result[item.value];
        closeAlert()
      })
    })
  }

}
