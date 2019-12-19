import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-date-input-group',
  templateUrl: './date-input-group.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DateInputGroupComponent, multi: true }
  ]
})
export class DateInputGroupComponent implements ControlValueAccessor {
  @Input() size: string;
  @Input() prepend: string;
  sizeCssClass: string = "";
  prependValue = "";


  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  constructor() { }

  ngOnInit() {
    if (this.size) {
      this.sizeCssClass = `input-group-${this.size}`;
    }
    if(this.prepend){
      this.prependValue = this.prepend;
    }
  }

}
