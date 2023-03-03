import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from "../dto/StaticsviewDTO";
import {StaticThuNhapThapServiceService} from "../service/static-thunhapthap-service.service";
import Chart from 'chart.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkDateLow} from "../validate/validate";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-static-thunhapthap',
  templateUrl: './static-thunhapthap.component.html',
  styleUrls: ['./static-thunhapthap.component.css']
})
export class StaticThunhapthapComponent implements OnInit {
  formGroup: FormGroup;
  chartdata: any;
  labelData: any[] = [];
  readData: any[] = [];
  chartThuNhapThap = Chart;

  static: StaticsviewDTO[] = [];
  startDateLowString = '';
  finishDateLowString = '';
  rowNumber = '';
  totalCalculate = 0;

  constructor(private staticsService: StaticThuNhapThapServiceService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }


  ngOnInit(): void {
    this.buildForm();

    this.findAllLowWithCondition(this.startDateLowString, this.finishDateLowString, this.rowNumber);

    this.staticsService.getAllDataLow(this.startDateLowString, this.finishDateLowString, this.rowNumber);
    this.createChart(this.labelData, this.readData);
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      startLowDate: ['', [Validators.required]],
      finalLowDate: ['', [Validators.required, checkDateLow]],
      rowLowNumbers: ['', [Validators.required,
        Validators.pattern("^([1-9]+)"), Validators.max(20)]]
    });
  }

  createChart(labelData: any, readData: any) {
    this.chartThuNhapThap = new Chart('ChartRentThuNhapThap', {
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

  findAllLowWithCondition(startDateLowString: string, finishDateLowString: string, rowNumber: string) {
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllDataLow(startDateLowString, finishDateLowString, rowNumber)
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
        }, error => {
          this.toast.warning('Lỗi server', 'Thông báo');
        }
      );

  }

  public dowloadFile(startDateLowString: string, finishDateLowString: string, rowNumber: string): void {
    this.staticsService.printAllDataLow(startDateLowString, finishDateLowString, rowNumber).subscribe(response => {
      const fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      const blob: Blob = response.body as Blob;
      const a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }


  total() {
    console.log(this.static);
    this.totalCalculate = 0;
    for (let i = 0; i < (this.static.length); i++) {
      this.totalCalculate = this.static[i].total + this.totalCalculate;
    }
    return this.totalCalculate;
  }
}

