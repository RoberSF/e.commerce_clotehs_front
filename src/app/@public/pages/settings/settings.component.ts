import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../../services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public settingsService: SettingsService) {
    this.settingsService.loadSettings();
   }

  ngOnInit(): void {
  }

  changeColor(theme:string, link: any) {
    this.aplicarCheck(link);
    // // cojo la url que se hace referencia en el index.html
    let url = `assets/css/colors/${theme}.css`
    // // accedo al "id=theme" que está en el index y con set attribute le digo que a ese atributo le ponga el 2º parámetro(url)
    this._document.getElementById('theme').setAttribute('href', url );
  
    // // pasamos los datos de settings al servicio
    this.settingsService.settings.theme = theme;
    this.settingsService.settings.themeUrl = url;
    // // guardamos los ajustes en el localstorage
    this.settingsService.saveSettings();
  
    // //hacemos que esto se cargue desde el principio, por tanto, vamos al app.component.ts 
    this.settingsService.applyTheme(theme);
  }

  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector');
  
    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }
  
    link.classList.add('working');
  
  }


  checkAfterLoadTheme() {
    let selectors:any =  document.getElementsByClassName('selector');
    let themeAfterLoad = this.settingsService.settings.theme
  
    for ( let ref of selectors) {
      ref.classList.remove('working');
      if (ref.getAttribute('data-theme') === themeAfterLoad ) {
        ref.classList.add('working');
        break; // sale del ciclo for
      }
    }
  }

}



