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
  findAll():Observable<Plane[]>{
    return this.httpClient.get<Plane[]>(this.url);
  }
}
