import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlaneStatus} from "../model/PlaneStatus";
import {Plane} from "../model/Plane";

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  url="http://localhost:8080/plane"
  constructor(private httpClient : HttpClient) { }
  findAll(numberPage:number):Observable<GetResponse>{
    return this.httpClient.get<GetResponse>(`${this.url}?page=${numberPage}`);
  }
  deletePlane(id){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
interface GetResponse {
  content: Plane[];
  totalPages: number;
  number: number;
}
