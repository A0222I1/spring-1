import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../model/Employee";
import {Observable} from "rxjs";
import {EmployeeFormCreateDTO} from "../dto/EmployeeFormCreateDTO";
import {AbstractControl} from "@angular/forms";
import {EmployeeViewDTO} from "../dto/EmployeeViewDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  url = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
  }

  findAllByNameAndIdCardAndAddressAndDepartment(name: string, id_card: string, address: string, department: string, page: number): Observable<GetResponse> {
    return this.http.get<GetResponse>(`${this.url}?name=${name}&id_card=${id_card}&address=${address}&department=${department}&page=${page}`);
  }

  updateAllStatusIsOff(): Observable<number> {
    return this.http.delete<number>(`${this.url}`);
  }

  updateStatusById(id: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

  findById(id: string): Observable<Employee> {
    console.log(id);
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  findByName(value: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/account/${value}`);
  }

  findByIdCard(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsIdCard?id_card=${value}`);
  }

  findByPhone(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsPhone?phone=${value}`);
  }

  save(value: AbstractControl): Observable<Employee> {
    console.log(this.getEmployeeDTO(value));
    return this.http.post<Employee>(`${this.url}`, this.getEmployeeDTO(value));
  }

  private getEmployeeDTO(control: AbstractControl): EmployeeFormCreateDTO {
    return {
      avatar: control.value.avatar,
      name: control.value.name.trim(),
      birthday: control.value.birthday,
      gender: control.value.gender,
      salary: control.value.salary,
      id_card: control.value.id_card,
      address: control.value.address.trim(),
      phone: control.value.phone ,
      email: control.value.email,
      salaryScale: control.value.salaryScale,
      department: control.value.department,
      account: control.value.account.trim(),
      password: control.value.password.trim()
    }
  }

  findByEmail(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existsEmail?email=${value}`);
  }
}

interface GetResponse {
  content: EmployeeViewDTO[];
  totalPages: number;
  number: number;
}
