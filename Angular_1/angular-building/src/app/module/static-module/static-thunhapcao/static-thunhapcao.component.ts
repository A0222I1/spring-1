import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from "../dto/StaticsviewDTO";
import {StaticThuNhapCaoServiceService} from "../service/static-thunhapcao-service.service"
import Chart from 'chart.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkDate, checkDateHigh} from "../validate/validate";


@Component({
  selector: 'app-static-thunhapcao',
  templateUrl: './static-thunhapcao.component.html',
  styleUrls: ['./static-thunhapcao.component.css']
})
export class StaticThunhapcaoComponent implements OnInit {

  chartdata: any;
  labelData: any[] = [];
  readData: any[] = [];
  chartThuNhapCao = Chart;
  formGroup: FormGroup;
  static: StaticsviewDTO[] = [];
  startDateHighString = '';
  finishDateHighString = '';
  rowNumber = '';
  totalCalculate = 0;

  constructor(private staticsService: StaticThuNhapCaoServiceService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.findAllHighWithCondition(this.startDateHighString, this.finishDateHighString, this.rowNumber);
    this.createChart(this.labelData, this.readData);
    this.buildForm();
  }

  findAllHighWithCondition(startDateHighString: String, finishDateLowString: String, rowNumber: String) {
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllDataHigh(startDateHighString, finishDateLowString, rowNumber)
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
          this.createChart(this.labelData, this.readData);

        });
  }


  buildForm() {
    this.formGroup = this.formBuilder.group({
      startHighDate: ['', [Validators.required]],
      finalHighDate: ['', [Validators.required, checkDateHigh]],
      rowHighNumbers: ['', [Validators.required,
        Validators.pattern("^([0-9]+)")]]
    });
  }

  createChart(labelData: any, readData: any) {
    this.chartThuNhapCao = new Chart('ChartRentThuNhapCao', {
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

  public dowloadFile(startDateLowString: String, finishDateLowString: String, rowNumber: String): void {
    this.staticsService.printAllDataHigh(startDateLowString, finishDateLowString, rowNumber).subscribe(response => {
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
