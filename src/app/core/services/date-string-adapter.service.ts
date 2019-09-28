import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateStringAdapterService implements NgbDateAdapter<Date> {
  // moment = moment;
  fromModel(value: Date): NgbDateStruct {

    if (!value) {
      return;
    }
    // var mom = this.moment(value);
    const date = new Date(value);
    return {
      year: Number(date.getFullYear()),
      month: Number(date.getMonth() ),
      day: Number(date.getDate())
    };
  }

  toModel(date: NgbDateStruct): Date {
    if (!date) {
      return;
    }
    return new Date(date.year, date.month, date.day);
  }
}
