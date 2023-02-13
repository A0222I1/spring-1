import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  URL = 'http://localhost:8080/home';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<News[]> {
    return this.httpClient.get<News[]>(this.URL);
  }

}
