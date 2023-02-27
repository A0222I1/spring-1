import {Role} from "./Role";

export interface Account {
  username: string;
  password: string;
  dateCreate?: Date;
  status?: string;
  role: string;
}
