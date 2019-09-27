import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';

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

	constructor(private route: ActivatedRoute, private dataService: DataStoreService) { }

	ngOnInit() {

		this.dataService.getReleases().subscribe(data => {
			if (data) {
				this.releases = data;
			}
		})
	}

}
