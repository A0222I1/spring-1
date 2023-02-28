import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerViewDTO} from "./dto/CustomerViewDTO";
import {Gender} from "../employee-module/model/Gender";
import {CustomerServiceService} from "./services/customer-service.service";
import {GenderServiceService} from "../employee-module/service/gender-service.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Department} from "../employee-module/model/Department";
import {DepartmentServiceService} from "../employee-module/service/department-service.service";
// @ts-ignore
import {ToastrService} from "ngx-toastr";
import {checkBirthday, checkTrim} from "../employee-module/utils/CustomValidate";
import {ContractServiceService} from "../contract-module/service/contract-service.service";
import {ContractViewDTO} from "../contract-module/dto/ContractViewDTO";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  formGroup: FormGroup;
  customers: CustomerViewDTO[] = [];
  genders: Gender[] = [];
  departments: Department[] = [];
  customerList: ContractViewDTO[] = [];
  totalPages: number = 0;
  pageNumber: number = 0;
  name_search: string = '';
  cmnd_search: string = '';
  address_search: string = '';
  company_search: string = '';
  fileChose: File = null;
  searchForm: boolean = false;
  message: string = '';
  alert: boolean = false;
  constructor(private customerService: CustomerServiceService,
              private genderService: GenderServiceService,
              private formBuilder: FormBuilder,
              private departmentService: DepartmentServiceService,
              private storage: AngularFireStorage,
              private contractService: ContractServiceService,
              private toastr: ToastrService
  ) {
    this.genderService.findAll().subscribe(value => this.genders = value);
    this.departmentService.findAll().subscribe(value => this.departments = value);
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.name_search, this.cmnd_search, this.address_search, this.company_search,this.pageNumber);
   }

  findAllWithCondition(name: string, id_card: string, address: string, company: string, page: number){
    if (page > this.totalPages) return;
    this.customerService.findAllByNameAndIdCard(name,id_card,address,company,page).subscribe(value => {
      this.customers = value.content;
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
      console.log(this.pageNumber);
      console.log(this.totalPages);
    });
  }


  refreshPage() {
    (<HTMLInputElement>document.getElementById("nameSearch")).value = '';
    (<HTMLInputElement>document.getElementById("cmndSearch")).value = '';
    (<HTMLInputElement>document.getElementById("addressSearch")).value = '';
    (<HTMLInputElement>document.getElementById("companySearch")).value = '';
    this.cmnd_search = '';
    this.name_search = '';
    this.address_search = '';
    this.company_search ='';
    this.ngOnInit();
  }

  deleteAll() {
    this.customerService.updateAllStatusIsOff().subscribe(value => {
      this.message = 'xóa tất cả thành công!!!';
      this.alert = true;
      document.getElementById("statusModal").click();
      this.ngOnInit();
    });
  };

  deleteById(id: string) {
    this.customerService.updateStatusById(id).subscribe(value => {
      // this.message = `xóa nhân viên với id ${id} thành công!!!`;
      // this.alert = true;
      this.toastr.success('Cảm ơn!', 'Đã xóa thành công');
      document.getElementById("cancle").click();
      if(this.customers.length == 1)
      {this.pageNumber  = this.pageNumber - 1;}
      this.ngOnInit();
    });
  };
  findAllByCustomerId(customerId: string) {
    this.contractService.findAllByCustomerId(customerId).subscribe(data => {
     this.customerList = data;
    })
  };


  findById(id: string) {
    this.customerService.findById(id).subscribe(value => {
        document.getElementById("name_delete").innerText = value.name;
        (<HTMLInputElement>document.getElementById("id_delete")).value = value.id;
      },
      error => {
        this.message = error.error;
        this.alert = true;
        this.ngOnInit();
      });
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      avatar: ['', [Validators.required]],
      name: ['', [Validators.required, checkTrim,
        Validators.minLength(5),
        Validators.pattern("^[A-Za-z úùụũủịỉìỉĩâăôđêọòóõỏáàảãạèéẹẽẻưửữựừứốồổộỗếềểễệấầẫẩậặắẳẵằạáàảã.?!@#$%^&*]+$"),
        Validators.maxLength(200)]],
      address: ['', [Validators.required, checkTrim, Validators.maxLength(200)]],
      birthday: ['', [Validators.required, checkBirthday]],
      email: ['', [Validators.required,
        Validators.pattern("^[\\w\\-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
      phone: ['', [Validators.required,
        Validators.pattern("^([0]|(\\+84))([0-9]{9})$")]],
      gender: ['', [Validators.required]],
      id_card: ['', [Validators.required,
        Validators.pattern("^([0-9]{12})$")]],
      account: ['', [Validators.required, checkTrim]]
    });
  }

  // detail(id: string) {
  //   this.findAllByCustomerId(id);
  // }

  detail(id: string) {
    this.customerService.findById(id).subscribe(value => {
      document.getElementById("nameCustomer").innerText =value.name;
      this.findAllByCustomerId(id);
    })
  }

}
