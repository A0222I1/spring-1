import {Gender} from "../../employee-module/model/Gender";
import {Account} from "../../employee-module/model/Account";

export interface Customer {
  id?: string;
  id_card?: string;
  name?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  address?: string;
  website?: string;
  company?: string;
  avatar?: string;
  gender?: Gender;
  account?: Account;
  status?: string;
}
