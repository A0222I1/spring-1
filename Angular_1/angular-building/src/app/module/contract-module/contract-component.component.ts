import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {parse} from 'ts-node';
import {Plane} from '../plane-module/model/Plane';
import {PlaneService} from '../plane-module/services/plane.service';
import {PlaneDTO} from '../plane-module/dto/PlaneDTO';
import {TermServiceService} from './service/term-service.service';
import {Term} from './module/Term';
import {CustomerServiceService} from './service/customer-service.service';
import {CustomerViewDTO} from './dto/CustomerViewDTO';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {DatePipe} from '@angular/common';
import {element} from 'protractor';
import {ContractServiceService} from './service/contract-service.service';
import {checkNegativeNumber, isFuture} from './utils/ContractCustomeValidate';
import {ContractFormCreateDTO} from './dto/ContractFormCreateDTO';
import {ToastrService} from 'ngx-toastr';
import {ContractViewDTO} from './dto/ContractViewDTO';



@Component({
  selector: 'app-contract-component',
  templateUrl: './contract-component.component.html',
  styleUrls: ['./contract-component.component.css']
})
export class ContractComponentComponent implements OnInit {
  formGroup: FormGroup;
  formattedNumber: any;
  planeList: PlaneDTO[];
  termList: Term[];
  customerList: CustomerViewDTO[];
  customerView: CustomerViewDTO;
  contractDTO: ContractFormCreateDTO;
  title: string;
  disabled = false;
  flagHidden: boolean;

  id: number;
  name = "abc";
  indexPagination = 0;
  totalPages = 0;
  public value = '';
  contracts: ContractViewDTO[] = [];

  customerNameSearch: string = "";
  employeeNameSearch:string= "";
  planeIdSearch: string = "";
  dateStartSearch:string = "";

  constructor(private planeService: PlaneService,
              private termServiceService: TermServiceService,
              private customerService: CustomerServiceService,
              private contractService: ContractServiceService,
              private datePipe: DatePipe,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllPlane();
    this.getAllTerm();
    this.getAllCustomer();
    this.buildForm();
    this.findAllByCondition(this.customerNameSearch, this.employeeNameSearch, this.planeIdSearch, this.dateStartSearch,0);


  }

  findAllByCondition(customerName: string, employeeName: string, planeId: string, startDay: string, page: number){
    // tslint:disable-next-line:radix
    // planeId = parseInt(planeId).toString();
    this.contractService.findAllByCondition(customerName, employeeName, planeId, startDay, page).subscribe(value => {

      console.log(value);
      this.contracts = value.content;
      this.indexPagination = value.number;
      this.totalPages = value.totalPages;
     });
  }



  changeId(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  delete(id: number) {
    this.contractService.delete(id).subscribe(check => {
      if (check) {
        this.toastrService.success('Xóa hợp đồng thành công.', 'Thông báo' );
        this.ngOnInit();
      } else  {
        this.toastrService.error("Xóa hợp đồng thât bại");
      }
    });
  }



  buildForm() {
    this.formGroup = new FormGroup({
      id : new FormControl(this.contractDTO === undefined ? "" : this.contractDTO.id),
      termId : new FormControl(this.contractDTO === undefined ? "" : this.contractDTO.termId, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      price: new FormControl(this.contractDTO === undefined ? '' : new Intl.NumberFormat().format(this.contractDTO.price).toString(), [Validators.required]),
      total: new FormControl(this.contractDTO === undefined ? '' : new Intl.NumberFormat().format(this.contractDTO.total).toString()),
      information: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.information, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      startDate: new FormControl(this.contractDTO === undefined ? this.getDateNow() : this.contractDTO.start_date,[Validators.required, isFuture]),
      endDate: new FormControl(""),
      // tslint:disable-next-line:max-line-length
      customerId: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.customerId, [Validators.required, Validators.pattern("^([0-9]{12})$")]),
      employeeId: new FormControl(this.contractDTO === undefined ? 'NV-0003' : this.contractDTO.employeeId),
      planeId: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.planeId, [Validators.required])
    });
  }


  saveAllForm() {
    console.log(this.formGroup);
    if (this.formGroup.invalid) {
      this.toastrService.error("Xin mời bạn nhập tất cả các trường còn lại");
    } else {
      this.formGroup.value.customerId = this.customerView.id;
      console.log(this.formGroup.value.customerId);
      this.contractService.save(this.formGroup).subscribe(data => {
        console.log(data);
        this.toastrService.success("Cập nhật thành công");
        this.ngOnInit();
        // tslint:disable-next-line:max-line-length
        document.getElementById(  "endModal").click();
      }, error => {
        console.log("HTTP Error Thuan Create", error);
      });
    }


  }
  getAllPlane() {
    this.planeService.getALlPlaneDTO().subscribe(data => {
      this.planeList = data;
    });
  }
  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    });

  }
  getAllTerm() {
    this.termServiceService.getAlL().subscribe(data => {
      this.termList = data;
    });
  }

  forMatNumber(value: any) {
    this.formattedNumber = new Intl.NumberFormat().format(parseFloat(value.replace(/,/g, '')));
    this.formGroup.patchValue({
      price: this.formattedNumber === 'NaN' ? '' : this.formattedNumber
    });
  }

  checkIdentifyNumber() {
    const indentifyNumber = this.formGroup.value.customerId;
    this.getAllCustomer();
    this.customerView = this.customerList.find(item => item.id_card === indentifyNumber);
    if (this.customerView === undefined) {
      this.toastrService.error("Xin lỗi thông tin của khách hàng chưa được lưu trên hệ thống của chúng tôi")
    } else  {
      this.toastrService.success("Thông khách đã tìm được xin mời bạn kiểm tra!!!")
    }
    console.log(this.customerView);


  }

  calculateEndDate() {
    this.getEndDate(this.formGroup.value.startDate, this.getTermNameInInt());
    this.calculateTotalPrice();

  }
  getDateNow(): string {
    return  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  getEndDate(startDate, term) {
    // tslint:disable-next-line:prefer-const
    let endDate = new Date(startDate);
    if (endDate.toString() !== "Invalid Date") {
      endDate.setMonth(endDate.getMonth()  + term);
      this.formGroup.patchValue({
        endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd')
      });
    }

  }


  calculateTotalPrice() {
    const price = parseFloat(this.formGroup.value.price.replace(/,/g, '')) * this.getTermNameInInt()
    if (!isNaN(price)) {
      this.formGroup.patchValue({
        total: new Intl.NumberFormat().format(price)
      });
    }

  }

  getTermNameInInt(): number {
    const term = this.formGroup.value.termId;
    if (term !== "") {
      let name;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.termList.length ; i++) {
        if (this.termList[i].id === term) {
          name = this.termList[i].name;
        }
      }
      // tslint:disable-next-line:radix
      return parseInt(name.slice(0, 2));
    }

  }

  editContract(id: number, idCard: string) {
    this.title = "Chỉnh Sửa Hợp Đồng";
    this.disabled = false;
    this.flagHidden = false;
    this.fillForm(id, idCard);


  }
  fillForm(id: number, idCard: string ) {
    this.contractService.findById(id).subscribe(data => {

      // get all contract information
      this.contractDTO = data;
      this.contractDTO.customerId = idCard;
      // fill customer infomation by [value]
      this.getAllCustomer();
      this.customerView = this.customerList.find(item => item.id_card === idCard);
      // update term
      const planeEdit: PlaneDTO = {id: this.contractDTO.planeId};
      this.planeList.push(planeEdit);
     // fill information
      this.buildForm();
      this.calculateEndDate();
    });


  }

  add() {
    this.title = "Thêm Mới Hợp Đồng";
    this.disabled = false;
    this.flagHidden = false;
    this.refresh();
  }

  refresh() {
    this.getAllPlane();
    console.log("refresh");
    console.log(this.planeList);
    this.contractDTO = undefined;
    this.buildForm();
    console.log(this.formGroup);
    this.customerView = undefined;
    // this.getAllPlane();
  }

  // tslint:disable-next-line:variable-name
  detail(id: any, id_card: any) {
    this.title = "Chi Tiết Hợp Đồng";
    this.disabled = true;
    this.flagHidden = true;

    this.fillForm(id, id_card);


  }


  refreshPage() {
    (document.getElementById('nameCustomer') as HTMLInputElement).value = '';
    (document.getElementById('nameEmployee') as HTMLInputElement).value = '';
    (document.getElementById('planeId') as HTMLInputElement).value = '';
    (document.getElementById('startDate') as HTMLInputElement).value = '';
    this.employeeNameSearch = '';
    this.customerNameSearch = '';
    this.planeIdSearch = '';
    this.dateStartSearch = '';
    this.ngOnInit();
  }
}
