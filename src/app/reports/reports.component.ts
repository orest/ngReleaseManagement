import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { Release } from '../core/modules/Release';
import { HeaderService } from '../layout/header/header.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {

  releases: Release[] = [];
  sortedData: Release[] = [];
  loading: boolean = false;
  constructor(private dataService: ReportsService, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Reports', 'find_in_page');

    this.loading = true
		this.dataService.getReleases().subscribe(data => {
			if (data) {
				this.releases = this.sortData(data);
				this.loading = false;
			}
		})
  }

  sortData(data) {
    return data.sort((a:any, b:any) =>
    new Date(b.release.releaseDate).getTime()-new Date(a.release.releaseDate).getTime()
    );
  }

}
