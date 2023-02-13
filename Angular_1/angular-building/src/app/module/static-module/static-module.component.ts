import { Component, OnInit } from '@angular/core';
import {StaticsviewDTO} from './dto/StaticsviewDTO';
import {StaticServiceService} from './service/static-service.service'
@Component({
  selector: 'app-static-module',
  templateUrl: './static-module.component.html',
  styleUrls: ['./static-module.component.css']
})
export class StaticModuleComponent implements OnInit {

  static : StaticsviewDTO[] = [];
  totalPages: number = 0;

  pageNumber: number = 1;
  startDateString: String ='';
  finishDateString: String ='';
  checkHighLow: Boolean = null;
  page: number = 1;
  pageSize: number = 10;
  StaticsviewDTO: StaticsviewDTO;
  stt: number = 1;
  totalSalary = 0;

  constructor(private staticsService: StaticServiceService) {
  }
  ngOnInit(): void {
    this.findAllWithCondition(this.startDateString, this.finishDateString, this.checkHighLow, 1, 10);
  }

  findAllWithCondition(startDateString: String, finishDateString: String, checkHighLow: Boolean, page: number, pageSize: number) {
    this.staticsService.getAllData(startDateString, finishDateString, checkHighLow, page, pageSize)
      .subscribe(
        (e: any) =>{
          console.log(e)
          this.static = e.listData;
        } )
    console.log(    this.staticsService.getAllData(startDateString, finishDateString, checkHighLow, page, pageSize))
  }
}
