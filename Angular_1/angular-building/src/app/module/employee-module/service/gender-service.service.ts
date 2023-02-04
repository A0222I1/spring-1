import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gender} from "../model/Gender";

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {
  url = "http://localhost:8080/type/gender";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.url);
  }

  findById(id: number| Object): Observable<Gender>{
    return this.http.get<Gender>(`${this.url}/${id}`);
  }
}
