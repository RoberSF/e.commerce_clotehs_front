import { TitleService } from '@admin/core/services/titleService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  title: string;

  constructor(private titleService: TitleService) {

    this.titleService.title$.subscribe( (title: string) => {
      this.title = title
    }) 
   }



}
