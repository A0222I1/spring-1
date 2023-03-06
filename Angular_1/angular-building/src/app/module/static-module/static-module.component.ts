import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from './dto/StaticsviewDTO';
import {StaticServiceService} from './service/static-service.service';
import {Chart} from "chart.js";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
/*
import moment = require("moment");
*/
import {checkDate} from "./validate/validate";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-s',
  templateUrl: './static-module.component.html',
  styleUrls: ['./static-module.component.css']
})
export class StaticModuleComponent implements OnInit {

  formGroup: FormGroup;
  chartdata: any;
  labelData: any[] = [];
  readData: any[] = [];
  chart = Chart;

  static: StaticsviewDTO[] = [];
  startDateString = '';
  finishDateString = '';
  totalCalculate = 0;

  constructor(private staticsService: StaticServiceService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.startDateString, this.finishDateString);
    // this.createChart(this.labelData, this.readData);
  }

  buildForm() {
    // @ts-ignore
    this.formGroup = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required, checkDate]]
    });
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
        maxBarThickness: 0.1,
        minBarLength: 0.1
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

  findAllWithCondition(startDateString: string, finishDateString: string) {
    this.chart = null;
    this.formGroup.markAsTouched();
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllData(startDateString, finishDateString)
      .subscribe(
        (e: any) => {
          this.static = e;
          this.chartdata = e;
          if (this.static.length === 0) {
            this.toast.warning('Dữ liệu không tìm thấy', 'Thông báo');
          }
          if (null != this.chartdata) {
            for (const item of this.chartdata) {
              this.labelData.push("MB " + item.plane.id);
              this.readData.push(item.total);
            }
          }
          this.createChart(this.labelData, this.readData);
        },
        error => {
          this.toast.error('Lỗi server', 'Thông báo');
        });
  }


  public dowloadFile(startDateLowString: string, finishDateLowString: string): void {
    this.staticsService.printAllData(startDateLowString, finishDateLowString).subscribe(response => {
      const fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      const blob: Blob = response.body as Blob;
      const a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
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

