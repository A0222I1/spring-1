import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from './dto/StaticsviewDTO';
import {StaticServiceService} from './service/static-service.service';
import {Chart} from "chart.js";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkBirthday, checkFile, checkPasswordConfirm, checkTrim} from "../employee-module/utils/CustomValidate";

@Component({
  selector: 'app-static-module',
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
  startDateString: String = ''; //'2023-02-10';
  finishDateString: String = '';    //'2023-02-15';
  stt: number = 1;
  totalSalary = 0;
  totalPages = 0;
  totalCalculate: number = 0;

  constructor(private staticsService: StaticServiceService,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.startDateString, this.finishDateString);
    this.createChart(this.labelData, this.readData);
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      finalDate: ['', [Validators.required]]
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

  findAllWithCondition(startDateString: String, finishDateString: String) {

    this.formGroup.markAsTouched()
    console.log(this.formGroup);
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllData(startDateString, finishDateString)
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

  public dowloadFile(startDateLowString: String, finishDateLowString: String): void {
    this.staticsService.printAllData(startDateLowString, finishDateLowString).subscribe(response => {
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
      this.totalCalculate = this.static[i].total + this.totalCalculate

    }
    return this.totalCalculate;
  }


}
