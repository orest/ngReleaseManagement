import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  public title = new BehaviorSubject('Title');
  public icon = new BehaviorSubject('Icon');
  
  constructor() { }

  setTitle(title, icon) {
    this.title.next(title);
    this.icon.next(icon);
  }
}