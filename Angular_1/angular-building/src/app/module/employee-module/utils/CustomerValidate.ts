import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {EmployeeServiceService} from "../service/employee-service.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";


export function checkBirthday(control: AbstractControl): ValidationErrors | null {
  let dayCheck = moment(control.value);
  let dayNow = moment(new Date());
  if (moment.duration(dayNow.diff(dayCheck)).years() < 18) {
    return {birthdaypast: true};
  }
  return null;
}

export function checkPasswordConfirm(abstractControl: AbstractControl): ValidationErrors | null {
  let password = abstractControl.value.password;
  let passwordConfirm = abstractControl.value.passwordConfirm;
  if (passwordConfirm != password) return {passworderror: true}
  return null;
}

export function checkTrim(abstractControl: AbstractControl): ValidationErrors | null {
  let check = abstractControl.value;
  if (check.trim() == '') return {trim: true}
  return null;
}

export function checkNameExists(accountService: EmployeeServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return accountService
      .findByName(control.value)
      .pipe(
        map((result: boolean) => {
            return result ? {usernameAlreadyExists: true} : null
          }
        )
      );
  };
}

export function checkPhoneExists(accountService: EmployeeServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return accountService
      .findByPhone(control.value)
      .pipe(
        map((result: boolean) => {

            return result ? {phoneAlreadyExists: true} : null
          }
        )
      );
  };
}

export function checkEmailExists(accountService: EmployeeServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return accountService
      .findByEmail(control.value)
      .pipe(
        map((result: boolean) => {
            console.log('email: ' + result)
            return result ? {emailAlreadyExists: true} : null
          }
        )
      );
  };
}
export function checkIdCardExists(accountService: EmployeeServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return accountService
      .findByIdCard(control.value)
      .pipe(
        map((result: boolean) => {

            return result ? {idCardAlreadyExists: true} : null
          }
        )
      );
  };
}
