import {AbstractControl, ValidationErrors} from "@angular/forms";
import * as moment from "moment";

export function checkDate(controls: AbstractControl): ValidationErrors | null {
  console.log(controls);
  const check = controls.value;

  let startDate = moment(new Date(controls?.parent?.get('startDate')?.value));
  let finalDate = moment(new Date(controls?.parent?.get('finalDate')?.value));
  console.log("startDate: " + startDate);
  console.log("finalDate: " + finalDate);
  console.log("res: " + (startDate <= finalDate));

  return (startDate <= finalDate) ? null : {invalidDate: true};
}
