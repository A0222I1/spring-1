import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerViewDTO} from "../dto/CustomerViewDTO";
import {Customer} from "../model/Customer";
import {AbstractControl} from "@angular/forms";
import {CustomerFormCreateDTO} from "../dto/CustomerFormCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  url ='http://localhost:8080/customer'

  constructor(private http: HttpClient) { }

  findAllByNameAndIdCard(name: string, id_card: string, page: number): Observable<GetResponse>{
    return this.http.get<GetResponse>(`${this.url}?name=${name}&id_card=${id_card}&page=${page}`);
  }

  findByIdCard(value: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/existsIdCard?id_card=/${value}`);
  }
  findByName(value: string): Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/account/${value}`);
  }
  // save(value: AbstractControl): Observable<Customer>{
  //   return this.http.post<Customer>(`${this.url}`, this.getCustomerDTO(value));
  // }
  //
  // private getCustomerDTO(control: AbstractControl): CustomerFormCreateDTO {
  //   return null;
  // }
}

interface GetResponse {
  content: CustomerViewDTO;
  totalPages: number;
  number: number;
}
