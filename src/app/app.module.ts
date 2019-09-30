import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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

import { DateStringAdapterService } from './core/services/date-string-adapter.service';
import { ManageClientComponent } from './client/manage-client/manage-client.component';
import { CollapsibleCardComponent } from './core/components/collapsible-card/collapsible-card.component';
import { ReleaseListComponent } from './release/release-list/release-list.component';
import { ReleaseDetailsComponent } from './release/release-details/release-details.component';
import { FeatureListComponent } from './feature/feature-list/feature-list.component';
import { FeatureDetailsComponent } from './feature/feature-details/feature-details.component';
import { WorkItemStatusPipe } from './core/pipes/work-item-status.pipe';

import { DateInputGroupComponent } from './core/components/date-input-group/date-input-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HeaderComponent,
    LayoutComponent,
    DashboardComponent,
    ReportsComponent,
    ReleaseListComponent,
    ReleaseDetailsComponent,
    FeatureComponent,
    ManageClientComponent,
    CollapsibleCardComponent,
    FeatureListComponent,
    FeatureDetailsComponent,
    WorkItemStatusPipe,
    
    DateInputGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgbModule
  ],
  providers: [{ provide: NgbDateAdapter, useClass: DateStringAdapterService }],
  entryComponents: [
    ManageClientComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
