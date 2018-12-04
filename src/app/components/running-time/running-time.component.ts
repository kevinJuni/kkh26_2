import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-running-time',
  templateUrl: './running-time.component.html',
  styleUrls: ['./running-time.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> RunningTimeComponent),
      multi: true
    }
  ]  
})
export class RunningTimeComponent implements ControlValueAccessor {
  propagateChange = (_: any) => {};

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(new TimeDuration(0, 0, 0));
  }

  writeValue (value: number) { // time in sec as input
    this.form.setValue(TimeDuration.fromSeconds(value));
  }

  registerOnChange (fn) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  setDisabledState(isDisabled: boolean) {
    if (isDisabled)
      this.form.disable();
    else
      this.form.enable();
  }

  update ($event) {
    let model = TimeDuration.from(this.form.value);
    this.propagateChange(model.asSeconds);
  }
}


export class TimeDuration
{
  constructor(
    public hours: number,
    public minutes: number,
    public seconds: number
  ) {}

  get asSeconds() : number {
    return this.seconds + (60 * this.minutes) + (60* 60* this.hours);
  }


  static from (model: any): TimeDuration {
    return new TimeDuration(model.hours, model.minutes, model.seconds);
  }

  static fromSeconds (secsIn: number) {
    var hours = ~~(secsIn / 3600),
    remainder = secsIn % 3600,
    minutes = ~~(remainder / 60),
    seconds = remainder % 60;

    return new TimeDuration(hours, minutes, seconds);
  }
}