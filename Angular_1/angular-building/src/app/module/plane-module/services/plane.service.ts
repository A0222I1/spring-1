import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaneStatus} from '../model/PlaneStatus';
import {Plane} from '../model/Plane';
import {PlaneDTO} from '../dto/PlaneDTO';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  url = 'http://localhost:8080/plane';

  constructor(private httpClient: HttpClient) {
  }

  findAll(area: string, stage: string, status: string, type: string, numberPage: number): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.url}?page=${numberPage}&area=${area}&stage=${stage}&status=${status}&type=${type}`);
  }

  deletePlane(id) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getALlPlaneDTO() {
    return this.httpClient.get<PlaneDTO[]>(this.url + '/available');
  }

  getAllRentedPlane() {
    return this.httpClient.get<PlaneDTO[]>(this.url + '/rented');
  }

  getTotalArea() {
    return this.httpClient.get<number>(this.url + '/totalArea');
  }

  savePlane(plane) {
    return this.httpClient.post(`${this.url}/add`, plane);
  }
}

interface GetResponse {
  content: Plane[];
  totalPages: number;
  number: number;
}
