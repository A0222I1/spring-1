import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "./model/Customer";
import {CustomerServiceService} from "./service/customer-service.service";
import {CustomerViewDTO} from "./dto/CustomerViewDTO";

@Component({
  selector: 'app-customer-module',
  templateUrl: './customer-module.component.html',
  styleUrls: ['./customer-module.component.css']
})
export class CustomerModuleComponent implements OnInit {
  formGroup: FormGroup;
  customers: CustomerViewDTO[] = [];
  totalPages: number = 0;
  pageNumber: number = 0;
  name_search: string = '';
  cmnd_search: string = '';
  fileChose: File = null;
  searchForm: boolean = false;
  message: string = '';
  alert: boolean = false;

  constructor(private customerService: CustomerServiceService,
              private formBuilder: FormBuilder) {
    this.buildForm();
    this.findAllWithCondition(this.name_search, this.cmnd_search,0);
    setTimeout(() => this.alert = false, 3000);
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.name_search, this.cmnd_search, 0);
    setTimeout(() => this.alert = false, 3000);
  }



  private findAllWithCondition(name: string, id_card: string, page: number) {
    if (page > this.totalPages) return;
    this.customerService.findAllByNameAndIdCard(name, id_card, page).subscribe(value => {
      this.customers = value.content
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
    });
  }
  refreshPage(){
    (<HTMLInputElement>document.getElementById("nameSearch")).value = '';
    (<HTMLInputElement>document.getElementById("cmndSearch")).value = '';
    this.cmnd_search = '';
    this.name_search = '';
    this.ngOnInit();
  }
  deleteAll(id: string){
    this.customerService.updateStatusById(id).subscribe(value => {
      this.message = `xóa khách hàng với id ${id} thành công!!!`
      this.alert = true;
      document.getElementById("deleteModal").click();
      this.ngOnInit();
    })
  }
  findById(id: string){
    this.customerService.findById(id).subscribe(value => {
      document.getElementById("name_delete").innerText =value.name;
        (<HTMLInputElement>document.getElementById("id_delete")).value = value.id;
    },
      error => {
        this.message = error.error;
        this.alert = true;
        this.ngOnInit();
      })
  }
  private buildForm() {
    //validator
  }
}
