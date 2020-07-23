import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { DataStoreService } from '../core/services/data-store.service';
import { Client } from '../core/modules/Client';
import { Feature } from '../core/modules/Feature';
import { Release } from '../core/modules/Release';
import { ReleaseFeature } from '../core/modules/ReleaseFeature';
import { HeaderService } from '../layout/header/header.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {

  releases: Release[] = [];
  clients: Client[] = [];
  features: Feature[] = [];
  sortedData: Release[] = [];
  featuresList: any[] = [];
  releaseFeatures: ReleaseFeature[] = [];
  loading: boolean = false;
  constructor(private dataService: ReportsService,
              private dataStoreService: DataStoreService,
              private headerService: HeaderService) { }

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

  getAllData(){
    forkJoin(
      this.dataStoreService.getClients(),
      this.dataStoreService.getFeatures(),
      this.dataService.getReleaseFeatures(),
      this.dataService.getReleases()
    ).subscribe(([clients, features, releaseFeatures, releases]) => {
      this.clients = clients;
      this.features = features;
      this.releaseFeatures = releaseFeatures;
      this.releases = releases;
    })

    this.featuresList = this.features.map(f => {
      let ftrs = 
        {       
          featureId: f.featureId,  
          featureName: f.displayName,
          clients: []       
        };
      
      let ftrRls = this.releaseFeatures.filter(x => x.featureId = f.featureId);
      ftrRls.forEach(rf => {
        let rel = this.releases.find(r => r.releaseId = rf.releaseId);
     
          ftrs.clients.push({
            
            featureReleaseStatus: rel.statusCode,
            appVersion: rel.applicationVersion
         
        })  
      })

      return ftrs;
    });
  }

  sortData(data) {
    return data.sort((a:any, b:any) =>
    new Date(b.release.releaseDate).getTime()-new Date(a.release.releaseDate).getTime()
    );
  }

}
