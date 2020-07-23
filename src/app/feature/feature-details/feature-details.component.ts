import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feature } from 'src/app/core/modules/Feature';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../../core/services/data-store.service';
import { HeaderService } from '../../layout/header/header.service';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styles: []
})
export class FeatureDetailsComponent implements OnInit {
  featureForm: FormGroup;
  private sub: any;
  id: number;
  mouseOverSave = false;

  feature: Feature;
  featureTypes = [
    { value: "core", text: "Core" },
    { value: "client", text: "Client" },
  ]

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataStoreService,
    private router: Router,
    private headerService: HeaderService) {

  }

  ngOnInit() {
    this.headerService.setTitle('Features', 'settings_applications');

    this.featureForm = this.fb.group({
      displayName: ["", [Validators.required, Validators.maxLength(50)]],
      description: "",
      statusCode: ["new", Validators.required],
      startDate: null,
      endDate: null,
      isApiCompleted: false,
      isUiCompleted: false
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      if (this.id > 0) {
        this.dataService.getFeature(this.id).subscribe(response => {

          this.feature = response;
          this.featureForm.patchValue({
            displayName: response.displayName,
            description: response.description,
            //typeCode: response.typeCode,
            statusCode: response.statusCode,
            startDate: response.startDate,
            endDate: response.endDate,
            isApiCompleted: response.isApiCompleted,
            isUiCompleted: response.isUiCompleted
          });
        });
      } else {
        this.feature = new Feature();
      }
    });


    //	this.featureForm.get("displayName").valueChanges.subscribe(value => console.log(value))
  }
  save() {
    if (this.id === 0) {
      this.dataService.createFeature(this.featureForm.value).subscribe(data => {
        this.router.navigate(["feature"])
      });
    } else {

      this.dataService.updateFeature(this.featureForm.value, this.id).subscribe(data => {
        this.router.navigate(["feature"]);
      });
    }
    console.log(this.featureForm.value);
  }

}
