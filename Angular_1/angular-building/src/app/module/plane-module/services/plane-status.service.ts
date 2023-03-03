import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PlaneStatus} from '../model/PlaneStatus';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaneStatusService {
  url = 'http://localhost:8080/type/planeStatus';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<PlaneStatus[]> {
    return this.httpClient.get<PlaneStatus[]>(this.url);
  }
}
