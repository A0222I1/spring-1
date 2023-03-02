import {AbstractControl, ValidationErrors} from '@angular/forms';
import * as moment from 'moment';


export function checkBirthday(control: AbstractControl): ValidationErrors | null {
  // console.log(control);
  const dayCheck = moment(control.value);
  const dayNow = moment(new Date());
  if (moment.duration(dayNow.diff(dayCheck)).years() < 18) {
    return {birthdaypast: true};
  }
  if (moment.duration(dayNow.diff(dayCheck)).years() > 150) {
    return {ageover: true};
  }
  return null;
}

export function checkPasswordConfirm(abstractControl: AbstractControl): ValidationErrors | null {
  const password = abstractControl.value.password;
  const passwordConfirm = abstractControl.value.passwordConfirm;
  if (passwordConfirm !== password) {
    return {passworderror: true};
  }
  return null;
}

export function checkTrim(abstractControl: AbstractControl): ValidationErrors | null {
  const check = abstractControl.value;
  return check.trim() === '' ? {trim: true} : null;
}
export function checkFile(abstractControl: AbstractControl): ValidationErrors | null {
  const check = abstractControl.value;
  return !check.trim().toLowerCase().endsWith(".jpg") &&
  !check.trim().toLowerCase().endsWith(".png") ?
    {filewrong: true} : null;
}


