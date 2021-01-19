import { Component, OnInit } from '@angular/core';
import menuSidebar from '@data/menus/adminMenu.json'
import { IMenuAdmin } from '../../../../@public/core/Interfaces/IMenuAdmin';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: Array<IMenuAdmin> = menuSidebar;

  constructor() { }

  ngOnInit(): void {
  }

}
