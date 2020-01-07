import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-card-and-title',
  templateUrl: './collapse-card-and-title.component.html',
  styles: []
})
export class CollapseCardAndTitleComponent implements OnInit {

  @Input() startCollapsed: string;
  isVisible = true;
  constructor() { }

  ngOnInit() {

    if (this.startCollapsed === "true") {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
