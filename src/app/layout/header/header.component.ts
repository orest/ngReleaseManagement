import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  title = '';
  icon = '';

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.title.subscribe(title => {
      this.title = title;      
    });
    this.headerService.icon.subscribe(icon => {
      this.icon = icon;
    })
  }

}
