import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  @Input() steps: any[];
  @Input() currentStep: number;
  @Input() heading: string;

  itemWidth: string;
  constructor() { }

  ngOnInit() {
    if (this.steps) {
      this.itemWidth = (100 / (this.steps.length - 1)) + '%';
      this.currentStep = Number(this.currentStep);
    }
  }

}
