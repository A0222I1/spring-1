import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerViewDTO} from "../dto/CustomerViewDTO";
import {Customer} from "../model/customer";
import {AbstractControl} from "@angular/forms";
import {Employee} from "../../employee-module/model/Employee";
import {CustomerFormCreateDTO} from "../dto/CustomerFormCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  url = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) { }

  findAllByNameAndIdCard(name: string, id_Card: string, address: string, company: string, page: number): Observable<GetResponse> {
    return this.http.get<GetResponse>(`${this.url}?name=${name}&id_card=${id_Card}&address=${address}&company=${company}&page=${page}`);
  }
//xoa tat ca customer - chuc nang lien quan trong task
  updateAllStatusIsOff(): Observable<number> {
    return this.http.delete<number>(`${this.url}`);
  }
//xoa theo id
  updateStatusById(id: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
//tim theo id
  findById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }
  //tim theo id cua hop dong contract
  findByIdCardForContract(idCard: string): Observable<CustomerViewDTO> {
    return this.http.get<CustomerViewDTO>(`${this.url}/findByIdCard/${idCard}`);
  }

//chuc nang tao moi cac truong lien quan (kiem tra co ton tai hay khong)
  findByName(value: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/account/${value}`);
  }

  findByIdCard(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsIdCard?id_card=${value}`);
  }

  findByPhone(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsPhone?phone=${value}`);
  }

  findByEmail(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsEmail?email=${value}`);
  }

  save(value: AbstractControl): Observable<Customer> {
    console.log(this.getCustomerDTO(value));
    return this.http.post<Customer>(`${this.url}`, this.getCustomerDTO(value));
  }

  private getCustomerDTO(control: AbstractControl): CustomerFormCreateDTO {
    return {
      id_card: control.value.id_card,
      name: control.value.name.trim(),
      email: control.value.email,
      phone: control.value.phone,
      birthday: control.value.birthday,
      address: control.value.address.trim(),
      website: control.value.website,
      company: control.value.company,
      avatar: control.value.avatar,
      gender: control.value.gender,
      account: control.value.account.trim(),
    };
  }
}

interface GetResponse {
  content: CustomerViewDTO[];
  totalPages: number;
  number: number;
}
