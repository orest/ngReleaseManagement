import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FeatureComponent } from './feature/feature.component';

// third party mods
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ReleaseComponent } from './release/release.component';
import { DateStringAdapterService } from './core/services/date-string-adapter.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HeaderComponent,
    LayoutComponent,
    DashboardComponent,
    ReportsComponent,
    ReleaseComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    NgbModule
  ],
  providers: [{ provide: NgbDateAdapter, useClass: DateStringAdapterService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
