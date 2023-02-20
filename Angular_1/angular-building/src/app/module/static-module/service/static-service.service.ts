import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StaticsviewDTO} from "../dto/StaticsviewDTO";

@Injectable({
  providedIn: 'root'
})

export class StaticServiceService {
  url = 'http://localhost:8080/statistics/getdata'

  constructor(private http: HttpClient) {
  }

  getAllData(startDateString: String, finishDateString: String) {
    return this.http.get<StaticsviewDTO[]>(`${this.url}?startDate=${startDateString}&finishDate=${finishDateString}`);
  }

  public printAllData(startDateString: String, finishDateString: String) {
    return this.http.get(`${this.url}/print?startDate=${startDateString}&finishDate=${finishDateString}`, {
      observe: 'response',
      responseType: 'blob'
    });
  }
}

interface GetResponse {
  content: StaticsviewDTO[];
  totalPages: number,
  number: number
}
