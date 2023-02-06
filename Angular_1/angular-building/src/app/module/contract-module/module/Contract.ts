import {Term} from './Term';

export interface Contract {
  id?: number;
  term?: Term;
  price?: number;
  total?: number;
  infomation?: string;
  start_date?: Date;
}
