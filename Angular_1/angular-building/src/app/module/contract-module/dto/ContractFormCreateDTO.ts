import {Term} from '../module/Term';

export interface ContractFormCreateDTO {
  id?: number;
  termId?: number;
  price?: number;
  total?: number;
  information?: string;
  start_date?: Date;
  customerId?: number;
  employeeId?: number;
  planeId?: number;
}
