import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaneStatus} from '../model/PlaneStatus';
import {Stage} from '../model/Stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  url = 'http://localhost:8080/type/stage';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Stage[]> {
    return this.httpClient.get<Stage[]>(this.url);
  }
}
