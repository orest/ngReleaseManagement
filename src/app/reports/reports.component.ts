import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { DataStoreService } from '../core/services/data-store.service';
import { Client } from '../core/modules/Client';
import { Feature } from '../core/modules/Feature';
import { Release } from '../core/modules/Release';
import { ReleaseFeature } from '../core/modules/ReleaseFeature';
import { ClientFeatures } from '../core/modules/ClientFeatures';
import { HeaderService } from '../layout/header/header.service';
import { forkJoin } from 'rxjs';
import { groupBy } from 'lodash';
import { element } from 'protractor';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {

  releases: Release[] = [];
  latestReleases: any = [];
  clients: Client[] = [];
  clientFeatures: ClientFeatures[] = [];
  features: Feature[] = [];
  sortedData: Release[] = [];
  featuresList: any[] = [];
  releaseFeatures: ReleaseFeature[] = [];
  clientFeaturesReportData: any[] = [];
  loading: boolean = false;
  clientFeatureDatas: any = [];
  dataReady: boolean = false;

  constructor(private dataReportsService: ReportsService,
              private dataStoreService: DataStoreService,
              private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Reports', 'find_in_page');

    forkJoin([
      this.dataStoreService.getClients(),
      this.dataReportsService.getClientFeatures(),
      this.dataStoreService.getFeatures()]
    ).subscribe(results => {
      if(results){
        this.clients = results[0];
        this.clientFeatures = results[1];
        this.features = results[2];
      }
    });

    this.loading = true
		this.dataReportsService.getReleases().subscribe(data => {
			if (data) {
				this.latestReleases = this.sortData(data);
				this.loading = false;
			}
		})

  }

  sortData(data) {
    return data.sort((a:any, b:any) =>
    new Date(b.release.releaseDate).getTime()-new Date(a.release.releaseDate).getTime()
    );
  }

  getClientFeatures(){
    this.clientFeatureDatas = [];
    var sortedClients = this.clients.sort(function(a, b){return a.clientId - b.clientId});

    this.features.forEach(element => {
      var obj = { "featureName": element.displayName, "featureId": element.featureId };


      var clientsPerFeature = this.clientFeatures.filter(a => a.featureId === element.featureId);

      sortedClients.forEach(el => {

        var client = clientsPerFeature.find(a => a.clientId === el.clientId);

        var appVer = client ? client.applicationVersion : "";
        var featStatus = client ? client.featureStatus : "";
        var relDate = client ? moment(client.releaseDate).format("MM/DD/YYYY") : "";
        var relId = (client && client.releaseId > 0) ? client.releaseId : 0;

        var featStatusColor, statusClass = "";
        switch(featStatus) {
          case "completed":
            featStatusColor = "#48C9B0";
            statusClass = "done";
            break;
          case "inprogress":
            featStatusColor = "#5DADE2";
            statusClass = "timelapse";
            break;
          case "new":
            featStatusColor = "#EB984E";
            statusClass = "fiber_new"
            break;
          default:
            featStatusColor = "";
        }

        obj[el.clientName.replace(/\s/g, "")] = { "appVer": appVer,
                                                  "featStatus": featStatus,
                                                  "relDate": relDate,
                                                  "featStatusColor": featStatusColor,
                                                  "statusClass": statusClass,
                                                  "relId": relId };

      })

      this.clientFeatureDatas.push(obj);
    });

    this.dataReady = true;
    //console.log(this.clientFeatureDatas);
  }
}
