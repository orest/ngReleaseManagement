import { Component, OnInit } from '@angular/core';
import { Feature } from '../core/modules/Feature';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styles: []
})
export class FeatureComponent implements OnInit {
    featureForm: FormGroup;
    feature: Feature = new Feature();
    featureTypes = [
        { value: "core", text: "Core" },
        { value: "client", text: "Client" },
    ]
    //description = new FormControl();

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.featureForm = this.fb.group({
            displayName: ["", [Validators.required, Validators.maxLength(50)]],
            description: "",
            typeCode: "core",
            statusCode: ["new", Validators.required],
            startDate: null,
            endDate: null,
            isCompleted: false
        })
        this.featureForm.get("displayName").valueChanges.subscribe(value=>console.log(value))
        // this.featureForm = new FormGroup({
        //     displayName: new FormControl(),
        //     description: this.description,
        //     typeCode: new FormControl(),
        //     statusCode: new FormControl(),
        //     startDate: new FormControl(),
        //     endDate: new FormControl(),
        //     isCompleted: new FormControl(false),
        // });
    }
    save() {
        console.log(this.featureForm.value)
    }

}
