import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styles: []
})
export class CollapsibleCardComponent implements OnInit {
  @Input() cardTitle: string;
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
