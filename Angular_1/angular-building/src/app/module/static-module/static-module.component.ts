import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from './dto/StaticsviewDTO';
import {StaticServiceService} from './service/static-service.service';
import {Chart} from "chart.js";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {checkBirthday, checkFile, checkPasswordConfirm, checkTrim} from "../employee-module/utils/CustomValidate";
/*
import moment = require("moment");
*/
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {checkDate} from "./validate/validate";

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
  startDateString: string = '';
  finishDateString: string = '';
  stt: number = 1;
  totalSalary = 0;
  totalPages = 0;
  totalCalculate: number = 0;

  constructor(private staticsService: StaticServiceService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.startDateString, this.finishDateString);
    this.createChart(this.labelData, this.readData);
  }

  buildForm() {
    // @ts-ignore
    this.formGroup = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required, checkDate]]
      // finalDate: ['', [Validators.required, checkDate]]

      // finalDate: new FormControl('', [checkDate(this.startDateString, this.finishDateString)]),
      });
  }

  dateValidator(startDate: string, finalDate: string) {
    return( formGroup: FormGroup) => {
      const control1 = formGroup.controls[startDate];
      const control2 = formGroup.controls[finalDate];
      if (control1.errors && !control2.errors.confirmedValidator) {
        return;
      }
      if (control1.value > control2.value) {
        console.log('haha');
        control2.setErrors({ dateValidator: true});
      } else {
        control2.setErrors(null);
      }
    };
  }
  /*checkDayInAndDayOut(control: AbstractControl): ValidationErrors | null {
    const startDate = moment(control.get("startDate").value);
    const endDate = moment(control.get("endDate").value);
    if (moment.duration(endDate.diff(startDate)).asDays() < 0) {
      return {nomatch: true};
    }
    return null;
  }*/

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

    this.formGroup.markAsTouched();
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
        });
    this.createChart(this.labelData, this.readData);
  }

  public dowloadFile(startDateLowString: string, finishDateLowString: string): void {
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
      this.totalCalculate = this.static[i].total + this.totalCalculate;
    }
    return this.totalCalculate;
  }


}

