import {Component, OnInit} from '@angular/core';
import {StaticsviewDTO} from '../dto/StaticsviewDTO';
import {StaticThuNhapCaoServiceService} from '../service/static-thunhapcao-service.service';
import Chart from 'chart.js';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkDateHigh} from '../validate/validate';
import {ToastrService} from 'ngx-toastr';


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


  constructor(private staticsService: StaticThuNhapCaoServiceService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.findAllHighWithCondition(this.startDateHighString, this.finishDateHighString, this.rowNumber);
    this.createChart(this.labelData, this.readData);
    this.buildForm();
  }

  findAllHighWithCondition(startDateHighString: string, finishDateLowString: string, rowNumber: string) {
    this.chartdata = [];
    this.labelData = [];
    this.readData = [];
    this.staticsService.getAllDataHigh(startDateHighString, finishDateLowString, rowNumber)
      .subscribe(
        (e: any) => {
          this.static = e;
          this.chartdata = e;
          if (this.static.length === 0) {
            this.toast.warning('Dữ liệu không tìm thấy', 'Thông báo');
          }
          if (null != this.chartdata) {
            for (const item of this.chartdata) {
              console.log(item);
              this.labelData.push('MB ' + item.plane.id);
              this.readData.push(item.total);
            }
          }
          this.createChart(this.labelData, this.readData);

        }, error => {
          this.toast.error('Lỗi server', 'Thông báo');
        });
  }


  buildForm() {
    this.formGroup = this.formBuilder.group({
      startHighDate: ['', [Validators.required]],
      finalHighDate: ['', [Validators.required, checkDateHigh]],
      rowHighNumbers: ['', [Validators.required,
        Validators.pattern('^([1-9]+)'), Validators.max(20)]]
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

  public dowloadFile(startDateLowString: string, finishDateLowString: string, rowNumber: string): void {
    this.staticsService.printAllDataHigh(startDateLowString, finishDateLowString, rowNumber).subscribe(response => {
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
