import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';
import { ReleaseService } from '../release.service';

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
	loading: boolean = false
	constructor(private route: ActivatedRoute, private dataService: ReleaseService) { }

	ngOnInit() {
		this.loading = true
		this.dataService.getReleases().subscribe(data => {
			if (data) {
				this.releases = data;
				this.loading = false;
			}
		})
	}

}
