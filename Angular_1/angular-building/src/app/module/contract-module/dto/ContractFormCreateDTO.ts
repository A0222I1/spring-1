import {Term} from '../module/Term';

export interface ContractFormCreateDTO {
  id?: number;
  termId?: number;
  price?: number;
  total?: number;
  information?: string;
  startDate?: Date;
  customerId?: string;
  employeeId?: number;
  planeId?: number;
}
