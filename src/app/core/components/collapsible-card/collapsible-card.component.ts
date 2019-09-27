import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styles: []
})
export class CollapsibleCardComponent implements OnInit {
  @Input() cardTitle:string;
  isVisible: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

}
