import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../model/Department";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  url = "http://localhost:8080/type/department"

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  findById(id: number | Object): Observable<Department>{
    return this.http.get<Department>(`${this.url}/department/${id}`);
  }
}
