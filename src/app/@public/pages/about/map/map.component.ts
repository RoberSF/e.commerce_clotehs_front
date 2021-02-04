import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = 42.2503744619549; lng = -8.69770088927632; zoom = 12;


  constructor() { }

  ngOnInit(): void {
  }

}
