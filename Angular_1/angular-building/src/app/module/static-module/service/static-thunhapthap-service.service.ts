import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StaticsviewDTO} from "../dto/StaticsviewDTO";

@Injectable({
  providedIn: 'root'
})

export class StaticThuNhapThapServiceService {
  url = 'http://localhost:8080/statistics/getdata'

  constructor(private http: HttpClient) {
  }

  getAllDataLow(startDateString: String, finishDateString: String, rowNumber: String) {
    return this.http.get<StaticsviewDTO[]>(`${this.url}/low?startDate=${startDateString}&finishDate=${finishDateString}&rowNumber=${rowNumber}`);
  }

  printAllDataLow(startDateString: String, finishDateString: String, rowNumber: String) {
    return this.http.get(`${this.url}/printlow?startDate=${startDateString}&finishDate=${finishDateString}&rowNumber=${rowNumber}`, {
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
