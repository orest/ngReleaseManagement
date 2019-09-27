import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { ReportsComponent } from './reports/reports.component';
import { FeatureComponent } from './feature/feature.component';

import { ReleaseDetailsComponent } from './release/release-details/release-details.component';
import { ReleaseListComponent } from './release/release-list/release-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'release/:id', component: ReleaseDetailsComponent },
  { path: 'release', component: ReleaseListComponent },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
