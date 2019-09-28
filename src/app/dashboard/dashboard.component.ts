import { Component, OnInit } from "@angular/core";
import { DataStoreService } from '../core/services/data-store.service';
import { Release } from '../core/modules/Release';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ReleaseService } from '../release/release.service';
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styles: []
})
export class DashboardComponent implements OnInit {
	loading = true;
	releases: Release[] = [];
	upcomingReleases: any[] = [];
	clients: any[] = [];
	constructor(private dataService: DataStoreService, private releaseService: ReleaseService) { }

	ngOnInit() {
		// this.dataService.getReleases().subscribe(data => {
		//   this.loading = false;
		//   this.upcomingReleases = data;
		// });

		// this.dataService.getClients().subscribe(data => {
		//   this.clients = data;
		// });


		// setTimeout(function () {
		//   this.loading = false;
		// }.bind(this), 2000);

		forkJoin([this.releaseService.getReleases(), this.dataService.getClients()]).subscribe(results => {
			this.loading = false;
			this.releases = results[0];
			this.clients = results[1];
			this.upcomingReleases = this.releases.map(p => {
				const client = this.clients.find(c => c.clientId === p.clientId);
				return {
					applicationVersion: p.applicationVersion,
					releaseId: p.releaseId,
					clientName: client.clientName
				};
			});
		});
	}

}
