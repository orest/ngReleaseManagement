import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';
import { ReleaseService } from '../release.service';
import { Route } from '@angular/compiler/src/core';
import { ReleasePlatform } from '../../core/modules/ReleasePlatform';

@Component({

	templateUrl: './release-details.component.html',
	styles: [
		".btn-light.active {color:#fff !important; background-color: var(--orange)!important; }",
		".btn-light {border:1px solid #14fd7e !important;width:45% }",
		".btn-group-toggle {width:100%; }",
		".col-form-label {font-weight:600 }",
	]
})
export class ReleaseDetailsComponent implements OnInit {
	id: number;
	private sub: any;
	release: Release;
	clients: Client[] = [];
	loading: boolean = false

	constructor(private route: ActivatedRoute, private dataService: DataStoreService,
		private releaseService: ReleaseService,
		private router: Router) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = +params.id;
			if (this.id > 0) {
				this.loading = true;
				this.releaseService.getRelease(this.id).subscribe(r => {
					this.release = r;
					this.loading = false;
					console.log(this.release)
				});
			} else {
				this.release = new Release();
				this.release.iosPlatfrom = this.releaseService.getPlatform("ios", 0);
				this.release.androidPlatfrom = this.releaseService.getPlatform("android", 0);
			}
		});


		this.dataService.getClients().subscribe(data => {
			if (data) {
				this.clients = data;
			}
		})
	}

	submitForm(form) {
		if (form.valid) {
			debugger

			if (this.id == 0) {
				this.releaseService.createRelease(this.release).subscribe(p => {
					this.router.navigate(["release"]);
				})
			} else {
				this.releaseService.updateRelease(this.release).subscribe(p => {
					this.router.navigate(["release"]);
				})
			}
		}
	}
}
