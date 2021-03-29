import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { DataStoreService } from '../core/services/data-store.service';
import { Client } from '../core/modules/Client';
import { HeaderService } from '../layout/header/header.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {
  selectedClient: any;
  loading: boolean = false;
  clints: Client[] = [];
  mouseOverSave: false;
  imgPath: string = "assets/images/";
  imgExt: string = ".png";

  constructor(private modal: NgbModal, private api: DataStoreService, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Client', 'people');

    this.api.getClients().subscribe(data => {
      this.clints = data;

    })
  }



  editClient(client) {
    let modalRef = this.modal.open(ManageClientComponent);
    if (client) {
      this.selectedClient = client;
    } else {
      this.selectedClient = { isActive: true }
    }


    modalRef.componentInstance.client = this.selectedClient;
    modalRef.result.then(result => {
      this.loading = true;
      if (!result.clientId) {
        this.api.createClient(result).subscribe(data => {
          this.selectedClient = null;
          this.loading = false;
          this.clints.push(data);
        });
      } else {
        this.api.updateClient(result).subscribe(data => {
          this.selectedClient = null;
          this.loading = false;
        });
      }

    }, reason => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }
}
