import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from "../dto/StaticsviewDTO";
import {StaticThuNhapThapServiceService} from "../service/static-thunhapthap-service.service";
import Chart from 'chart.js';

@Component({
  selector: 'app-static-thunhapthap',
  templateUrl: './static-thunhapthap.component.html',
  styleUrls: ['./static-thunhapthap.component.css']
})
export class StaticThunhapthapComponent implements OnInit {

  chartdata: any;
  labelData: any[] = [];
  readData: any[] = [];
  chart = Chart;

  static: StaticsviewDTO[] = [];
  startDateLowString: String = ''; //'2023-02-10';
  finishDateLowString: String = '';    //'2023-02-15';
  stt: number = 1;
  totalSalary = 0;
  totalPages = 0;
  rowNumber: String = '';
  totalCalculate: number = 0;

  constructor(private staticsService: StaticThuNhapThapServiceService) {
  }

  ngOnInit(): void {
    this.findAllLowWithCondition(this.startDateLowString, this.finishDateLowString, this.rowNumber);

    this.staticsService.getAllDataLow(this.startDateLowString, this.finishDateLowString, this.rowNumber)
      .subscribe(result => {

      });
    this.createChart(this.labelData, this.readData);
  }

  createChart(labelData: any, readData: any) {
    this.chart = new Chart('ChartRent', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Doanh thu cho thuê',
            data: readData,
            backgroundColor: 'blue'
          },
        ],
        // maxBarThickness: 0.1,
        // minBarLength: 0.1
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.2
          }]
        },
        aspectRatio: 2.5,
      }

    });
  }

  findAllLowWithCondition(startDateLowString: String, finishDateLowString: String, rowNumber: String) {
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllDataLow(startDateLowString, finishDateLowString, rowNumber)
      .subscribe(
        (e: any) => {
          this.static = e;

          this.chartdata = e;
          if (null != this.chartdata) {
            for (let i = 0; i < this.chartdata.length; i++) {
              console.log(this.chartdata[i]);
              this.labelData.push("MB " + this.chartdata[i].plane.id);
              this.readData.push(this.chartdata[i].total);
            }
          }
        })
    this.createChart(this.labelData, this.readData);

  }

  public dowloadFile(startDateLowString: String, finishDateLowString: String, rowNumber: String): void {
    this.staticsService.printAllDataLow(startDateLowString, finishDateLowString, rowNumber).subscribe(response => {
      let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
      console.log(fileName);
    });
  }


  total() {
    this.totalCalculate = 0;
    for (let i = 0; i < (this.static.length); i++) {
      this.totalCalculate = this.static[i].total + this.totalCalculate;
    }
    return this.totalCalculate;
  }
}
