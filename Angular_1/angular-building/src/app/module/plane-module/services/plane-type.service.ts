import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaneType} from '../model/PlaneType';

@Injectable({
  providedIn: 'root'
})
export class PlaneTypeService {
  url = 'http://localhost:8080/type/planeType';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<PlaneType[]> {
    return this.httpClient.get<PlaneType[]>(this.url);
  }
}
