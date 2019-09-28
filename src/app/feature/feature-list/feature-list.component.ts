import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Feature } from '../../core/modules/Feature';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feature-list',
	templateUrl: './feature-list.component.html',
	styles: []
})
export class FeatureListComponent implements OnInit {
	features: Feature[] = []
	constructor(private dataService: DataStoreService, private router: Router) { }

	ngOnInit() {
		this.dataService.getFeatures().subscribe(response => {
			this.features = response;
		})
	}

	addNew() {
		this.router.navigate(["feature", 0])

	}

}
