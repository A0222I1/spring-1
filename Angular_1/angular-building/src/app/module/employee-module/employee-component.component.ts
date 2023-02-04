import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from "./service/employee-service.service";

import {GenderServiceService} from "./service/gender-service.service";
import {DepartmentServiceService} from "./service/department-service.service";
import {SalaryScaleServiceService} from "./service/salary-scale-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender} from "./model/Gender";
import {SalaryScale} from "./model/SalaryScale";
import {Department} from "./model/Department";
import {
  checkBirthday,
  checkEmailExists,
  checkIdCardExists,
  checkNameExists,
  checkPasswordConfirm,
  checkPhoneExists,
  checkTrim
} from "./utils/CustomerValidate";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {EmployeeViewDTO} from "./dto/EmployeeViewDTO";

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})
export class EmployeeComponentComponent implements OnInit {
  formGroup: FormGroup;

  employees: EmployeeViewDTO[] = [];

  genders: Gender[] = [];

  salaries: SalaryScale[] = [];

  departments: Department[] = [];
  totalPages: number = 0;

  pageNumber: number = 0;

  name_search: string = '';
  cmnd_search: string = '';
  address_search: string = '';
  department_search: string = '';
  fileChose: File = null;


  searchForm: boolean = false;
  message: string = '';

  alert: boolean = false;

  constructor(private employeeService: EmployeeServiceService,
              private genderService: GenderServiceService,
              private formBuilder: FormBuilder,
              private departmentService: DepartmentServiceService,

              private storage: AngularFireStorage,
              private salaryService: SalaryScaleServiceService) {
    this.genderService.findAll().subscribe(value => this.genders = value);
    this.departmentService.findAll().subscribe(value => this.departments = value);
    this.salaryService.findAll().subscribe(value => this.salaries = value);
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.name_search, this.cmnd_search, this.address_search, this.department_search, 0);
    setTimeout(() => this.alert = false, 3000);
  }

  findAllWithCondition(name: string, id_card: string, address: string, department: string, page: number) {
    if (page > this.totalPages) return;
    this.employeeService.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card, address, department, page).subscribe(value => {
      this.employees = value.content;
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
    });
  }

  refreshPage() {
    (<HTMLInputElement>document.getElementById("nameSearch")).value = '';
    (<HTMLInputElement>document.getElementById("cmndSearch")).value = '';
    (<HTMLInputElement>document.getElementById("addressSearch")).value = '';
    (<HTMLInputElement>document.getElementById("departmentSearch")).value = '';
    this.department_search = '';
    this.address_search = '';
    this.cmnd_search = '';
    this.name_search = '';
    this.ngOnInit();
  }

  deleteAll() {
    this.employeeService.updateAllStatusIsOff().subscribe(value => {
      this.message = 'xóa tất cả thành công!!!';
      this.alert = true;
      document.getElementById("statusModal").click();
      this.ngOnInit();
    });
  }

  deleteById(id: string) {
    this.employeeService.updateStatusById(id).subscribe(value => {
      this.message = `xóa nhân viên với id ${id} thành công!!!`;
      this.alert = true;
      document.getElementById("deleteModal").click();
      this.ngOnInit();
    })
  }

  findById(id: string) {
    this.employeeService.findById(id).subscribe(value => {
        document.getElementById("name_delete").innerText = value.name;
        (<HTMLInputElement>document.getElementById("id_delete")).value = value.id;
      },
      error => {
        this.message = error.error;
        this.alert = true;
        this.ngOnInit();
      })
  }

  buildForm() {
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
      salaryScale: ['', [Validators.required]],
      department: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(1)]],
      id_card: ['', [Validators.required,
        Validators.pattern("^([0-9]{12})$")]],
      account: ['', [Validators.required, checkTrim]],
      password: ['', [Validators.required, checkTrim, Validators.pattern('')]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validator: [checkPasswordConfirm]
    })
  }

  saveForm() {

    this.employeeService.save(this.formGroup).subscribe(value => {
       this.message = `tạo mới thành công nhân viên tên ${value.name}`;
      document.getElementById("createModal").click();
      this.alert = true;
      this.ngOnInit();
    });

  }

  saveAllForm() {
    let flag: boolean = true;
    if (checkIdCardExists != null) {
      flag = false;
      document.getElementById("successCMND").style.display = 'none';
      document.getElementById("cmndExists").style.display = 'block';
      console.log('id card here')
    }

    if (checkEmailExists != null) {
      document.getElementById("successEmail").style.display = 'none';
      document.getElementById("emailExists").style.display = 'block';
      flag = false;
      console.log('email here')
    }


    if (checkPhoneExists != null) {
      document.getElementById("successPhone").style.display = 'none';
      document.getElementById("phoneExists").style.display = 'block';
      console.log('phone here')
      flag = false;
    }

    if (checkNameExists != null) {
      document.getElementById("successName").style.display = 'none';
      document.getElementById("nameExists").style.display = 'block';
      console.log('name here')
      flag = false;
    }


    if (flag) {
      // đặt tên cho file nên thêm tiền tố ngày đăng để tránh trùng lập tên file sẽ gây mất dữ liệu
      // employeeAvatar/ là để tách folder lưu ra cho dễ kiểm soát
      const filePath = `employeeAvatar/${Date.now()}${this.fileChose.name}`;
      const fileRef = this.storage.ref(filePath);
      // bắt đầu upload
      this.storage.upload(filePath, this.fileChose)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log(url)
              // return về link url đã lưu trên firebase. set nó vào trong form sau khi đã lưu
              this.formGroup.value.avatar = url;
              // và lưu form
              this.saveForm();
            });
          })
        )
        .subscribe();
      // this.saveForm();
    }
  }

  changeCMND() {
    document.getElementById("successCMND").style.display = 'block';
    document.getElementById("cmndExists").style.display = 'none';
  }

  changeEmail() {
    document.getElementById("successEmail").style.display = 'block';
    document.getElementById("emailExists").style.display = 'none';
  }

  changePhone() {
    document.getElementById("successPhone").style.display = 'block';
    document.getElementById("phoneExists").style.display = 'none';
  }

  changeUsername() {
    document.getElementById("successName").style.display = 'block';
    document.getElementById("nameExists").style.display = 'none';
  }
}
