import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Feature } from '../../core/modules/Feature';
import { Router } from '@angular/router';
import { HeaderService } from '../../layout/header/header.service';

@Component({
	selector: 'app-feature-list',
	templateUrl: './feature-list.component.html',
	styles: []
})
export class FeatureListComponent implements OnInit {
	features: Feature[] = []
	constructor(private dataService: DataStoreService, private router: Router, private headerService: HeaderService) { }

	ngOnInit() {
		this.headerService.setTitle('Features', 'settings_applications');

		this.dataService.getFeatures().subscribe(response => {
			this.features = response;
		})
	}

	addNew() {
		this.router.navigate(["feature", 0])

	}

}
