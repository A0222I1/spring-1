import {Gender} from "./Gender";
import {SalaryScale} from "./SalaryScale";
import {Department} from "./Department";

export interface Employee{
  readonly id?: string,
  avatar?: string,
  name?: string,
  birthday?: Date,
  gender?: Gender,
  salary?: number,
  id_card?: string,
  address?: string,
  phone?: string,
  email?: string,
  salaryScale?: SalaryScale,
  department?: Department,
  account: Account,
  status: string,
}
