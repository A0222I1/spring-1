import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlaneStatus} from "../model/PlaneStatus";
import {Plane} from "../model/Plane";
import {PlaneDTO} from '../dto/PlaneDTO';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  url ="http://localhost:8080/plane"
  constructor(private httpClient : HttpClient) { }
  findAll(numberPage:number):Observable<GetResponse>{
    return this.httpClient.get<GetResponse>(`${this.url}?page=${numberPage}`);
  }
  deletePlane(id){
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  getALlPlaneDTO() {
    return this.httpClient.get<PlaneDTO[]>(this.url + "/available");
  }

  getAllRentedPlane() {
    return this.httpClient.get<PlaneDTO[]>(this.url + "/rented");
  }

}
interface GetResponse {
  content: Plane[];
  totalPages: number;
  number: number;
}

