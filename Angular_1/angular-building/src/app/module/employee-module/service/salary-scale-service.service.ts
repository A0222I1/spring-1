import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalaryScale} from "../model/SalaryScale";

@Injectable({
  providedIn: 'root'
})
export class SalaryScaleServiceService {
  url = "http://localhost:8080/type/salary"

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<SalaryScale[]> {
    return this.http.get<SalaryScale[]>(this.url);
  }
  findById(id: number | Object): Observable<SalaryScale>{
    return this.http.get<SalaryScale>(`${this.url}/${id}`);
  }
}
