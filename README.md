# MeangFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Psrts App

La app se divide en función del tipo de usuario(client-admin). Para cliente será sólo un ecommerce y para admin hay una parte pública y una parte de administración de la tienda. 
En el mismo código diferenciamos esas dos partes con @admin @public.

El objetivo es hacer el código lo más rehutilizable posible compartiendo componentes. Para ello tenemos una parte del código llamada @shared dónde creamos los componentes tales
como las tablas de users o genres enviando los datos entre componentes padres e hijos con mediación de los service. 

## @shared

Table-pagination se comparte para ver las diferentes tablas. Enviamos los datos desde el módulo al componente compartido.

## @Data
Almacenamos archivos json para utlizar en la portada de nuestro eccomerce. Librería externa instalada y documentado para ahorrar tiempo