import { Component, OnInit } from "@angular/core";
import { DataStoreService } from '../core/services/data-store.service';
import { Release } from '../core/modules/Release';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ReleaseService } from '../release/release.service';
import * as moment from 'moment';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [
    ".item-status {width:130px}"
  ]
})
export class DashboardComponent implements OnInit {
  loading = true;
  releases: Release[] = [];
  upcomingReleases: any[] = [];
  clients: any[] = [];
  releaseTimeline: any = [
    { dateLabel: 'January 2017', cssClass: "today", title: 'Today' },
    { dateLabel: 'January 2017', cssClass: "completed", title: 'Qa start' },
    { dateLabel: 'March 2017', title: 'UAT start ' },
    { dateLabel: 'April 2017', title: 'UAT end' },
    { dateLabel: 'May 2017', title: 'Release' }
  ];
  constructor(private dataService: DataStoreService, private releaseService: ReleaseService) { }

  ngOnInit() {

    forkJoin([this.releaseService.getUpcomingReleases(), this.dataService.getClients()]).subscribe(results => {
      this.loading = false;
      this.releases = results[0];
      this.clients = results[1];
      this.upcomingReleases = this.releases.map(p => {
        const today = moment();

        let rls = {
          releaseId: p.releaseId,
          applicationVersion: p.applicationVersion,
          client: p.client,
          daysUntilQa: p.qaStartDate ? moment(p.qaStartDate).diff(today, 'days') : "",
          daysUntilText: p.qaStartDate ? moment(p.qaStartDate).fromNow() : "",
          daysUntilText2: p.qaStartDate ? moment(p.qaStartDate).fromNow() : "",
          qaEndDateText: p.qaEndDate ? moment(p.qaEndDate).fromNow() : "",
          uatStartDateText: p.uatStartDate ? moment(p.uatStartDate).fromNow() : "",
          uatEndDateText: p.uatEndDate ? moment(p.uatEndDate).fromNow() : "",
          releaseDateText: p.releaseDate ? moment(p.releaseDate).fromNow() : "",
          releaseItems: []
        };

        this.releaseTimeline = [];

        this.releaseTimeline.push({ dateLabel: today.format("MMM, D"), cssClass: "today", title: 'Today' })
        this.addDateToTimeline(p.qaStartDate, 'Qa start');
        this.addDateToTimeline(p.uatStartDate, 'UAT start');
        this.addDateToTimeline(p.uatEndDate, 'UAT End');
        this.addDateToTimeline(p.releaseDate, 'Release');

        p.features.forEach(f => {
          rls.releaseItems.push({
            title: f.displayName,
            type: "Feature",
            apiCompleted: f.isApiCompleted,
            uiCompleted: f.isUiCompleted,
            status: f.statusCode
          });
        });

        p.workItems.forEach(f => {
          rls.releaseItems.push({
            title: f.title,
            type: f.typeCode,
            apiCompleted: f.isApiCompleted,
            uiCompleted: f.isUiCompleted,
            status: f.statusCode
          });
        });


        return rls;
        //const client = this.clients.find(c => c.clientId === p.clientId);
        // let data = {
        //   applicationVersion: p.applicationVersion,
        //   releaseId: p.releaseId,
        //   clientName: client.clientName,
        //   daysUntilQa: 0,
        //   daysUntilUAT: 0,
        //   title: client.clientName + ' ( ' + p.applicationVersion + ' )',
        //   releaseItems: []
        // };
        // if (p.qaStartDate) {
        //   data.daysUntilQa = 10;
        //   data.title += ".  Until QA: " + data.daysUntilQa
        // }
        // data.releaseItems.push({
        //   id: 1,
        //   title: "Ipsum totam repellendus ex rem saepe suscipit facere",
        //   type: "Feature",
        //   apiCompleted: true,
        //   uiCompleted: true,
        //   status: "pending"
        // },
        //   {
        //     id: 1,
        //     title: "Aspernatur, ipsa. Ipsum totam repellendus ex rem saepe suscipit facere",
        //     type: "Feature",
        //     apiCompleted: true,
        //     uiCompleted: true,
        //     status: "completed"
        //   },
        //   {
        //     id: 1,
        //     title: "Aspernatur, ipsa. Ipsum totam repellendus ex rem saepe suscipit facere",
        //     type: "Feature",
        //     apiCompleted: true,
        //     uiCompleted: false,
        //     status: "canceled"
        //   },
        //   {
        //     id: 2,
        //     title: "Sint deleniti debitis aspernatur velit, nostrum enim. Aspernatur, ipsa",
        //     type: "Enhancement",
        //     apiCompleted: true,
        //     uiCompleted: false,
        //     status: "inprogress"
        //   },
        //   {
        //     id: 2,
        //     title: "Quasi, molestiae debitis. Sint deleniti debitis aspernatur velit, nostrum enim. Aspernatur, ipsa",
        //     type: "Bug",
        //     apiCompleted: true,
        //     uiCompleted: false,
        //     status: "new"
        //   })
        //return data;
      });
    });
  }

  addDateToTimeline(date, title) {
    if (date) {
      const m = moment(date)
      this.releaseTimeline.push({ dateLabel: m.format("MM/D") + " (" + m.fromNow() + ")", cssClass: "", title: 'Qa starts' })
    }
  }
}
