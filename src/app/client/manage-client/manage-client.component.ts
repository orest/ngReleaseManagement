import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-manage-client',
	templateUrl: './manage-client.component.html',
	styles: ['em {color:red; float:right }']
	// styleUrls: ['./manage-client.component.scss']
})
export class ManageClientComponent implements OnInit {
	public client: any = {
		isActive: true
	}
	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
	}

	save(formValues) {
		console.log(formValues)
		this.activeModal.close(this.client);
	}

	submitForm(formValues) {
		console.log(formValues)
		this.activeModal.close(this.client);
		//this.activeModal.close(formValues);
	}
}
