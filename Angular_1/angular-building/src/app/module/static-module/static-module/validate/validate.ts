import {AbstractControl, ValidationErrors} from "@angular/forms";
import * as moment from "moment";

export function checkDate(controls: AbstractControl): ValidationErrors | null {
  const check = controls.value;

  let startDate = moment(new Date(controls?.parent?.get('startDate')?.value));
  let finalDate = moment(new Date(controls?.parent?.get('finalDate')?.value));

  return ('' == controls?.parent?.get('startDate')?.value) || (startDate <= finalDate) ? null : {invalidDate: true};
}

export function checkDateLow(controls: AbstractControl): ValidationErrors | null {
  const check = controls.value;

  let startDate = moment(new Date(controls?.parent?.get('startLowDate')?.value));
  let finalDate = moment(new Date(controls?.parent?.get('finalLowDate')?.value));
  return ('' == controls?.parent?.get('startLowDate')?.value) || (startDate <= finalDate) ? null : {invalidDate: true};
}

export function checkDateHigh(controls: AbstractControl): ValidationErrors | null {
  const check = controls.value;

  let startDate = moment(new Date(controls?.parent?.get('startHighDate')?.value));
  let finalDate = moment(new Date(controls?.parent?.get('finalHighDate')?.value));
  return ('' == controls?.parent?.get('startHighDate')?.value) || (startDate <= finalDate) ? null : {invalidDate: true};
}
