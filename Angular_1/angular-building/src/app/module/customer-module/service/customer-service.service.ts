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
  updateAllStatusIsOff(): Observable<number> {
    return this.http.delete<number>(`${this.url}`);
  }
  updateStatusById(id: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
  findById(id: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.url}/${id}`)
  }

  findByIdCard(value: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/existsIdCard?id_card=/${value}`);
  }
  findByName(value: string): Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/account/${value}`);
  }
  save(value: AbstractControl): Observable<Customer>{
    return this.http.post<Customer>(`${this.url}`, this.getCustomerDTO(value));
  }

  private getCustomerDTO(control: AbstractControl): CustomerFormCreateDTO {
    return {
      idCard: control.value.idCard,
      name: control.value.name.trim(),
      email: control.value.email,
      phone: control.value.phone,
      birthday: control.value.birthday,
      address: control.value.address,
      website: control.value.address,
      company: control.value.company,
      avatar: control.value.avatar,
      gender: control.value.gender,
      account: control.value.account
    }
  }
}

interface GetResponse {
  content: CustomerViewDTO[];
  totalPages: number;
  number: number;
}
