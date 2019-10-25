import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

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
  todayOffset = -100;
  constructor() { }

  ngOnInit() {
    if (this.steps) {
      this.itemWidth = (100 / (this.steps.length - 1)) + '%';
      this.currentStep = Number(this.currentStep);
      let today = moment();
      const daysBetween = this.steps[this.steps.length - 1].date.diff(this.steps[0].date, 'days');
      const fromStartTillToday = today.diff(this.steps[0].date, 'days');
      this.todayOffset = daysBetween * fromStartTillToday + 3;
      this.todayOffset = Math.max(0, this.todayOffset);
    }
  }

}
