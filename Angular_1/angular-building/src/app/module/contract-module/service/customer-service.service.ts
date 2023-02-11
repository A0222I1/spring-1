import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerViewDTO} from '../dto/CustomerViewDTO';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  url = "http://localhost:8080/customer"

  constructor(private httpClient: HttpClient) { }

  getAllCustomer(): Observable<CustomerViewDTO[]>{
    return  this.httpClient.get<CustomerViewDTO[]>(this.url + "/dto")
  }

}
