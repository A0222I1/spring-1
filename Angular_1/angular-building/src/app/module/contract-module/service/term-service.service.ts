import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Term} from '../module/Term';

@Injectable({
  providedIn: 'root'
})
export class TermServiceService {
  url = "http://localhost:8080/term";
  constructor(private httpClient: HttpClient) {

  }
  getAlL() {
    return this.httpClient.get<Term[]>(this.url);
  }
}
