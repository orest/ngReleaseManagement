import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';


const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'client', component: ClientComponent },
	{ path: '',    redirectTo: '/dashboard',    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
