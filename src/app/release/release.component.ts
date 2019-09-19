import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from '../core/modules/Release';
import { DataStoreService } from '../core/services/data-store.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styles: [".btn-light.active {color:#fff !important; background-color: var(--blue)!important}"]
})
export class ReleaseComponent implements OnInit {
  id: number;
  private sub: any;
  release: Release;
  constructor(private route: ActivatedRoute, private dataService: DataStoreService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;

      this.dataService.getRelease(this.id).subscribe(r => {
        this.release = r;
      });
    });
  }

}
