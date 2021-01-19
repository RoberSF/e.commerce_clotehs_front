import { Injectable,Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

settings: Settings = {
  themeUrl:'assets/css/colors/default.css',
  theme: 'default'
}
              // esto vale para acceder a todo el DOM
constructor(@Inject(DOCUMENT) private _document) {
  this.loadSettings();
 }

saveSettings() {
  localStorage.setItem('settings', JSON.stringify(this.settings) ) // el localstorage solo guarda información de tipo string
}

loadSettings() {
  //puede que en el locaStorage haya un ajustes o no, por que lo primero valido
  if(localStorage.getItem('settings')) {
    // reconvierto el JSON a como estaría antes
    this.settings = JSON.parse(localStorage.getItem('settings'));
    this.applyTheme(this.settings.theme)
  }
}

applyTheme(theme:any) {
  // cojo la url que se hace referencia en el index.html
  let url = `assets/css/colors/${theme}.css`
  // accedo al "id=theme" que está en el index y con set attribute le digo que a ese atributo le ponga el 2º parámetro(url)
  this._document.getElementById('theme').setAttribute('href', url );

  // pasamos los datos de settings al servicio
  this.settings.theme = theme;
  this.settings.themeUrl = url;
  // guardamos los ajustes en el localstorage
  this.saveSettings();

  //hacemos que esto se cargue desde el principio, por tanto, vamos al app.component.ts 
}

}




interface Settings {
  themeUrl:string;
  theme:string
}