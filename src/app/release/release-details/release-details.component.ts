import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from '../../core/modules/Release';
import { DataStoreService } from '../../core/services/data-store.service';
import { Client } from '../../core/modules/Client';

@Component({
  
  templateUrl: './release-details.component.html',
  styles: [
	  ".btn-light.active {color:#fff !important; background-color: var(--orange)!important; }",
	  ".btn-light {border:1px solid #14fd7e !important;width:45% }",
]
})
export class ReleaseDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  release: Release;
  clients: Client[] = [];
  constructor(private route: ActivatedRoute, private dataService: DataStoreService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.dataService.getRelease(this.id).subscribe(r => {
        this.release = r;
      });
    });

    this.dataService.getClients().subscribe(data => {
      if (data) {
        this.clients = data;
      }
    })
  }

}
