# ReleaseAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

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



ng g c feature -s  --spec false
ng g service services/DataStore --spec false --dry-run
ng g pipe core/pipes/work-item-status --skipTests=true  --dryRun
ng g c core/components/collapse-card-and-title -s  --spec false

npm install lodash  ngx-loading --save

##register loading module
import {NgxLoadingModule} from 'ngx-loading';
NgxLoadingModule.forRoot({})
  <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }"></ngx-loading>

##register ng-bootstrap
npm install @ng-bootstrap/ng-bootstrap --save 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  ...
  imports: [NgbModule, ...],
  ...
})

---
npm install moment --save

ng build --prod --base-href="/ra/"
