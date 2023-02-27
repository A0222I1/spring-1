import {Component, OnInit} from '@angular/core';
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
import {fakeAsync} from '@angular/core/testing';
import {Token} from '@angular/compiler';
import {TokenApi} from '../employee-module/model/dto/TokenApi';
import {EmployeeViewDTO} from '../employee-module/dto/EmployeeViewDTO';
import {AccountService} from '../../account/service/account.service';
import {EmployeeServiceService} from '../employee-module/service/employee-service.service';
import {truncate} from 'fs';


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

  token: TokenApi;
  employeeAccount: EmployeeViewDTO;
  displayEmployee: EmployeeViewDTO;

  id: number;
  name = '';
  indexPagination = 0;
  totalPages = 0;
  public value = '';

  contracts: ContractViewDTO[] = [];

  customerNameSearch = '';
  employeeNameSearch = '';
  planeIdSearch = '';
  dateStartSearch = '';

  checkStartDate = false;

  constructor(private planeService: PlaneService,
              private termServiceService: TermServiceService,
              private customerService: CustomerServiceService,
              private contractService: ContractServiceService,
              private employeeService: EmployeeServiceService,
              private datePipe: DatePipe,
              private accountService: AccountService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllPlane();
    this.getAllTerm();
    this.getAllCustomer();
    this.getEmployee();
    this.buildForm();
    this.findAllByCondition(this.customerNameSearch, this.employeeNameSearch, this.planeIdSearch, this.dateStartSearch, this.indexPagination);
  }

  findAllByCondition(customerName: string, employeeName: string, planeId: string, startDay: string, page: number) {
    // tslint:disable-next-line:radix
    // planeId = parseInt(planeId).toString();
    this.contractService.findAllByCondition(customerName, employeeName, planeId, startDay, page).subscribe(value   => {
      this.contracts = value.content;
      this.indexPagination = value.number;
      this.totalPages = value.totalPages;
    });
  }


  changeId(id: number, name: string, accountName: string) {
    if (this.employeeAccount.maxRole === 1 || this.employeeAccount.account === accountName) {
      document.getElementById('close').click();
      this.id = id;
      this.name = name;
    } else {
      document.getElementById('notificationModalButton').click();
    }


  }

  delete(id: number) {
    this.contractService.delete(id).subscribe(check => {
      if (check) {
        this.toastrService.success('Xóa hợp đồng thành công.', 'Thông báo');
        if (this.contracts.length === 1) {
          this.indexPagination -= 1;
        }
        // tslint:disable-next-line:max-line-length
        this.findAllByCondition(this.customerNameSearch, this.employeeNameSearch, this.planeIdSearch, this.dateStartSearch, this.indexPagination);
      } else {
        this.toastrService.error('Xóa hợp đồng thât bại');
      }
    });
  }


  buildForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.id),
      termId: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.termId, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      price: new FormControl(this.contractDTO === undefined ? '' : new Intl.NumberFormat().format(this.contractDTO.price).toString(), [Validators.required]),
      total: new FormControl(this.contractDTO === undefined ? '' : new Intl.NumberFormat().format(this.contractDTO.total).toString()),
      information: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.information, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      startDate: new FormControl(this.contractDTO === undefined ? this.getDateNow() : this.contractDTO.startDate, [Validators.required]),
      endDate: new FormControl(''),
      // tslint:disable-next-line:max-line-length
      customerId: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.customerId, [Validators.required, Validators.pattern('^([0-9]{12})$')]),
      employeeId: new FormControl(this.employeeAccount === undefined ? '' : this.employeeAccount.id),
      planeId: new FormControl(this.contractDTO === undefined ? '' : this.contractDTO.planeId, [Validators.required])
    });

  }


  getEmployee() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
      this.employeeAccount = data;
      this.displayEmployee = this.employeeAccount;
      // console.log(this.employeeAccount);
    });

  }

  // tslint:disable-next-line:ban-types
  updateEmployee(userName: string) {
    this.employeeService.findByUserName(userName).subscribe(data => {
      this.displayEmployee = data;

    });
  }

  saveAllForm() {
    if (this.formGroup.invalid) {
      this.toastrService.error('Xin mời bạn nhập tất cả các trường bắt buộc');
    } else {
      this.formGroup.value.customerId = this.customerView.id;
      console.log(this.formGroup.value.customerId);
      this.contractService.save(this.formGroup).subscribe(data => {
        console.log(data);
        this.toastrService.success('Cập nhật thành công');
        this.ngOnInit();
        // tslint:disable-next-line:max-line-length
        document.getElementById('endModal').click();
      }, error => {
        console.log('HTTP Error Thuan Create', error);
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
      this.toastrService.error('Xin lỗi thông tin của khách hàng chưa được lưu trên hệ thống của chúng tôi');
    } else {
      this.toastrService.success('Thông khách đã tìm được xin mời bạn kiểm tra!!!');
    }
  }

  calculateEndDate() {
    this.getEndDate(this.formGroup.value.startDate, this.getTermNameInInt());
    this.calculateTotalPrice();

  }

  getDateNow(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getEndDate(startDate, term) {
    // tslint:disable-next-line:prefer-const
    let endDate = new Date(startDate);
    if (endDate.toString() !== 'Invalid Date') {
      endDate.setMonth(endDate.getMonth() + term);
      this.formGroup.patchValue({
        endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd')
      });
    }

  }


  calculateTotalPrice() {
    const price = parseFloat(this.formGroup.value.price.replace(/,/g, '')) * this.getTermNameInInt();
    if (!isNaN(price)) {
      this.formGroup.patchValue({
        total: new Intl.NumberFormat().format(price)
      });
    }

  }

  getTermNameInInt(): number {
    const term = this.formGroup.value.termId;
    if (term !== '') {
      let name;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.termList.length; i++) {
        if (this.termList[i].id === term) {
          name = this.termList[i].name;
        }
      }
      // tslint:disable-next-line:radix
      return parseInt(name.slice(0, 2));
    }

  }

  // @ts-ignore
  // @ts-ignore
  editContract(id: number, idCard: string, accountName: string, roleRecord: number) {
    if (this.employeeAccount.maxRole ===   1 || this.employeeAccount.account === accountName) {
      document.getElementById('edit').click();
      this.title = 'Chỉnh Sửa Hợp Đồng';
      this.disabled = false;
      this.checkStartDate = true;
      this.flagHidden = false;
      this.fillForm(id, idCard, accountName);
    } else {
      this.detail(id, idCard, accountName);
      this.toastrService.warning('Xin thông báo tài khoản của bạn chỉ có quyền xem chi tiết record này');
      document.getElementById('openDetailModal').click();
    }
  }

  fillForm(id: number, idCard: string, accountName: string) {
    this.contractService.findById(id).subscribe(data => {
      // get all contract information
      this.contractDTO = data;
      this.contractDTO.customerId = idCard;
      // fill customer information by [value]
      this.getAllCustomer();
      this.customerView = this.customerList.find(item => item.id_card === idCard);
      // update plane
      const planeEdit: PlaneDTO = {id: this.contractDTO.planeId};
      if (this.planeList.find(item => item.id === planeEdit.id) === undefined) {
        this.planeList.push(planeEdit);
      }
      // fill information
      this.buildForm();
      this.calculateEndDate();
      this.updateEmployee(accountName);
    });
  }

  add() {
    this.title = 'Thêm Mới Hợp Đồng';
    this.disabled = false;
    this.flagHidden = false;
    this.checkStartDate = false;
    this.getEmployee();
    this.refresh();
    this.formGroup.controls.startDate.setValidators(isFuture);
  }

  refresh() {
    this.getAllPlane();
    this.contractDTO = undefined;
    this.buildForm();
    console.log(this.formGroup);
    this.customerView = undefined;
  }

  // tslint:disable-next-line:variable-name
  detail(id: any, id_card: any, accountName: string) {
    this.title = 'Chi Tiết Hợp Đồng';
    this.disabled = true;
    this.flagHidden = true;
    this.fillForm(id, id_card, accountName);
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
