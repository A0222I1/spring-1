import {AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors} from '@angular/forms';
import {EmployeeServiceService} from '../service/employee-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';


export function checkBirthday(control: AbstractControl): ValidationErrors | null {
  const dayCheck = moment(control.value);
  const dayNow = moment(new Date());
  if (moment.duration(dayNow.diff(dayCheck)).years() < 18) {
    return {birthdaypast: true};
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

export function fileSizeValidator(files: FileList) {
  // tslint:disable-next-line:only-arrow-functions
  return function(control: FormControl) {
    // return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (file) {
      const fileSize = files.item(0).size;
      const fileSizeInKB = Math.round(fileSize / 1024);
      if (fileSizeInKB >= 19) {
        return {
          fileSizeValidator: true
        };
      } else {
        return null;
      }
    }
    return null;
  };
}
