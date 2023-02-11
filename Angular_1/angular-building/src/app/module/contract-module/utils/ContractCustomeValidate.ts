import {AbstractControl, ValidationErrors} from '@angular/forms';
import * as moment from "moment";

export function isFuture(control: AbstractControl) : ValidationErrors | null {
  let dayCheck = moment(control.value)
  let dayNow = moment(new Date())
  dayCheck = dayCheck.startOf('day');
  dayNow = dayNow.startOf('day');
  // console.log(dayNow);
  // console.log(dayCheck);
  if(!dayCheck.isSameOrAfter(dayNow)) {
    return {"pastday" : true}
  }
  return null;

}

export function checkNegativeNumber(control: AbstractControl) : ValidationErrors | null {
 let number = parseFloat(control.value.replace(/,/g, ''));
 if(number < 0) {
   return {"negativenumber" : true}
 }
 return null;

}
