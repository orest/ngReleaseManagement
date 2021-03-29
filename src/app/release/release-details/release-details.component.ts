import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';
import { ReleaseService } from '../release.service';
import { Route } from '@angular/compiler/src/core';
import { ReleasePlatform } from '../../core/modules/ReleasePlatform';
import { Feature } from 'src/app/core/modules/Feature';
import { HeaderService } from '../../layout/header/header.service';

@Component({

  templateUrl: './release-details.component.html',
  styles: [
    ".btn-light.active {color:#fff !important; background-color: #fe7016!important; }",
    ".btn-light {border:1px solid #2780E3 !important;width:45%; dispaly:block; margin:0 4px; border-radius:20px }",
    ".btn-group-toggle {width:100%; }",
    ".list-group-item {padding: 0.75rem 0.25rem 0.75rem 0.5rem }"
  ]
})
export class ReleaseDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  release: Release;
  clients: Client[] = [];
  features: Feature[] = [];
  loading = false;
  mouseOverSave = false;
  platformSectionOpened = false;
  newFeatureId = 0;
  workItem = {
    releaseId: 0,
    title: "",
    typeCode: "enhancmnt",//Bug, Enhancement, Maintenance
    statusCode: "new"
  };

  constructor(private route: ActivatedRoute, private dataService: DataStoreService,
    private releaseService: ReleaseService,
    private router: Router,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Release', 'filter_none');

    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      if (this.id > 0) {
        // this.loading = true;
        // this.releaseService.getRelease(this.id).subscribe(r => {
        // 	this.release = r;
        // 	this.loading = false;
        // 	console.log(this.release)
        // });
        this.getReleaseInfo();
      } else {
        this.release = new Release();
        this.release.iosPlatfrom = this.releaseService.getPlatform("ios", 0);
        this.release.androidPlatfrom = this.releaseService.getPlatform("android", 0);
      }
    });


    this.dataService.getClients().subscribe(data => {
      this.clients = data;
    })

    this.dataService.getFeatures().subscribe(response => {
      this.features = response;
    })
  }

  getReleaseInfo() {
    this.loading = true;
    this.releaseService.getRelease(this.id).subscribe(r => {
      this.release = r;
      this.loading = false;

    });
  }

  submitForm(form) {
    if (form.valid) {
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

  addFeature() {
    if (this.newFeatureId) {
      const feature = this.features.find(p => p.featureId == this.newFeatureId);
      if (feature) {
        this.releaseService.assignFeatureToRelease(this.id, feature).subscribe(p => {
          this.getReleaseInfo();
        })
      }
    }
  }

  removeFeature(f) {
    if (f && f.releaseFeatureId) {
      this.releaseService.removeFeatureFromRelease(f.releaseFeatureId).subscribe(p => {
        this.getReleaseInfo();
      })
    }
  }

  featureStatusChanged(feature) {

    console.log(feature)
    this.releaseService.updateReleaseFeatures(feature).subscribe(p => {
      console.log(p);
    });

  }

  addWorkItem() {
    // let workItem = {
    //   releaseId: this.id,
    //   title: this.workItemTitle,
    //   typeCode: "enhancement"
    // }
    this.workItem.releaseId = this.id;

    this.releaseService.addWorkItemToRelease(this.workItem).subscribe(response => {
      this.getReleaseInfo();
    });
  }

  removeWorkItem(workItem) {
    this.releaseService.removeWorkItem(workItem).subscribe(response => {
      this.getReleaseInfo();
      //this.workItemTitle = "";
    });
  }
  workItemStatusChanged(workItem) {
    this.releaseService.updateWorkItem(workItem).subscribe(response => {
      //this.getReleaseInfo();
    });
  }
  togglePlatformSection() {
    this.platformSectionOpened = !this.platformSectionOpened;
  }

}
