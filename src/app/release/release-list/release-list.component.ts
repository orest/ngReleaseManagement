import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';
import { ReleaseService } from '../release.service';
import { HeaderService } from '../../layout/header/header.service';

@Component({
	selector: 'app-release',
	templateUrl: './release-list.component.html',
	styles: [".btn-light.active {color:#fff !important; background-color: var(--blue)!important}"]
})
export class ReleaseListComponent implements OnInit {
	id: number;
	private sub: any;
	clients: Client[] = [];
	releases: Release[] = [];
	loading: boolean = false;
	distinctReleases: Release[] = [];
	sortedReleases: Release[] = [];
	active: number = 1;
	constructor(private route: ActivatedRoute, private dataService: ReleaseService, private headerService: HeaderService) { }

	ngOnInit() {
		this.headerService.setTitle('Release', 'filter_none');

		this.loading = true
		this.dataService.getReleases().subscribe(data => {
			if (data) {
				this.releases = this.sortReleaseByDate(data);
				this.sortedReleases = this.releases;
				this.loading = false;

				this.distinctReleases = this.releases.filter(
					(release, i, arr) => arr.findIndex(t => t.client.clientName === release.client.clientName) === i);
			}
		})
	}

	sortByClient(clientName){
		this.sortedReleases = this.releases;
		var filterArr = this.releases.filter(s => s.client.clientName === clientName);
		this.sortedReleases = this.sortReleaseByDate(filterArr);
	}

	sortByAllClients(){
		this.ngOnInit()
	}

	sortReleaseByDate(data) {
		return data.sort((a, b) => {
		  return <any>new Date(b.releaseDate) - <any>new Date(a.releaseDate);
		});
	  }

}
