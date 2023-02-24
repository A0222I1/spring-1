import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Employee} from '../../employee-module/model/Employee';
import {ContractFormCreateDTO} from '../dto/ContractFormCreateDTO';
import {CustomerServiceService} from './customer-service.service';
import {ContractComponentComponent} from '../contract-component.component';
import {ContractViewDTO} from '../dto/ContractViewDTO';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {
  url = 'http://localhost:8080/contract';

  constructor(private httpClient: HttpClient,
              private customerService: CustomerServiceService) {
  }

  save(value: AbstractControl): Observable<ContractFormCreateDTO> {
    console.log(this.getContractDTO(value));
    // return null;
    return this.httpClient.post<ContractFormCreateDTO>(`${this.url}`, this.getContractDTO(value));
  }


  getAll(page): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + '?page=' + page);
  }

  findAllByCondition(nameCustomer: string, employeeName: string, planeId: string, daystart: string, page: number): Observable<GetResponse> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<GetResponse>(`${this.url}/list?customerName=${nameCustomer}&employeeName=${employeeName}&planeId=${planeId}&dateStart=${daystart}&page=${page}`);
  }

  // tslint:disable-next-line:ban-types
  delete(id: number): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.httpClient.delete<Boolean>(this.url + '/' + id);
  }

  findById(id: number): Observable<ContractFormCreateDTO> {
    return this.httpClient.get<ContractFormCreateDTO>(this.url + '/' + id);
  }

  private getContractDTO(control: AbstractControl): ContractFormCreateDTO {
    return {
      id: control.value.id,
      termId: control.value.termId,
      price: parseFloat(control.value.price.replace(/,/g, '')),
      // total: parseFloat(control.value.total.replace(/,/g, '')),
      information: control.value.information,
      startDate: control.value.startDate,
      customerId: control.value.customerId,
      employeeId: control.value.employeeId,
      planeId: control.value.planeId
    };
  }


  getContractPlane(): Observable<ContractViewDTO[]> {
    return this.httpClient.get<ContractViewDTO[]>('http://localhost:8080/contract/contractViewDTO');

  }
}

interface GetResponse {
  content: ContractViewDTO[];
  totalPages: number;
  number: number;
}

