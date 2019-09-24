import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { DataStoreService } from '../core/services/data-store.service';
import { Client } from '../core/modules/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {
  selectedClient: any;
  loading: boolean = false
  clints: Client[] = [];
  constructor(private modal: NgbModal, private api: DataStoreService) { }

  ngOnInit() {
    this.api.getClients().subscribe(data => {
      this.clints = data;
      
    })
  }

  showCreatePop() {

  }

  editClient(client) {
    let modalRef = this.modal.open(ManageClientComponent);
    this.selectedClient = client || {};
    modalRef.componentInstance.client = this.selectedClient;
    modalRef.result.then(result => {
      console.log('Modal result', result);
      debugger
      this.loading = true;
      // this.api.save(result).subscribe(data => {
      //  this.selectedClient= null;
      //   this.loading = false;
      // });
    }, reason => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }
}
