import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StaticsviewDTO} from "../dto/StaticsviewDTO";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   }),
// };

@Injectable({
  providedIn: 'root'
})

export class StaticServiceService {
  url = 'http://localhost:8080/statistics/getdata'

  constructor(private http: HttpClient) {
  }

  getAllData(startDateString: String, finishDateString: String, checkHighLow: Boolean, page: number, pageSize: number) {
    return this.http.get<GetResponse>(`${this.url}?startDate=${startDateString}&finishDate=${finishDateString}&checkHighLow=${checkHighLow}&page=${page}&pageSize=${pageSize}`);
  }
}

interface GetResponse {
  content: StaticsviewDTO;
}
