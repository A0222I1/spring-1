import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeServiceService} from './service/employee-service.service';
import {GenderServiceService} from './service/gender-service.service';
import {DepartmentServiceService} from './service/department-service.service';
import {SalaryScaleServiceService} from './service/salary-scale-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Gender} from './model/Gender';
import {SalaryScale} from './model/SalaryScale';
import {Department} from './model/Department';
import {checkBirthday, checkFile, checkPasswordConfirm, checkTrim} from './utils/CustomValidate';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {EmployeeViewDTO} from './dto/EmployeeViewDTO';
import {forkJoin} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
  totalPages = 1;
  pageNumber = 0;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('deleteClose') deleteClose: ElementRef;
  @ViewChild('addNewContract') formRecipe: ElementRef;
  // tslint:disable-next-line:variable-name
  name_search = '';
  // tslint:disable-next-line:variable-name
  cmnd_search = '';
  // tslint:disable-next-line:variable-name
  address_search = '';
  // tslint:disable-next-line:variable-name
  department_search = '';
  fileChose: File;
  message = '';
  employeeView: EmployeeViewDTO = {salary: 1};
  imageSrc: string | ArrayBuffer = "";

  constructor(private employeeService: EmployeeServiceService,
              private genderService: GenderServiceService,
              private formBuilder: FormBuilder,
              private departmentService: DepartmentServiceService,
              private storage: AngularFireStorage,
              private salaryService: SalaryScaleServiceService,
              private changeDetectorRef: ChangeDetectorRef,
              private statusService: ToastrService
  ) {
    this.genderService.findAll().subscribe(value => this.genders = value);
    this.departmentService.findAll().subscribe(value => this.departments = value);
    this.salaryService.findAll().subscribe(value => this.salaries = value);
  }

  ngOnInit(): void {
    this.buildForm();
    this.findAllWithCondition(this.name_search, this.cmnd_search, this.address_search, this.department_search, this.pageNumber);
  }

  findAllWithCondition(name: string, idCard: string, address: string, department: string, page: number) {
    this.employeeService.findAllByNameAndIdCardAndAddressAndDepartment(name, idCard, address, department, page).subscribe(value => {
      this.employees = value.content;
      this.pageNumber = value.number;
      this.totalPages = value.totalPages;
      if (this.employees.length === 0) {
        document.getElementById("hidden-button").click();
        this.message = "Không tìm thấy nhân viên nào theo kết quả tìm kiếm.";
      }
    });
  }

  validPage(page): boolean {
    if (page >= this.totalPages || page < 0) {
      document.getElementById("hidden-button").click();
      (document.getElementById("pageChoice") as HTMLInputElement).value = "";
      this.message = `Trang chỉ nên trong khoảng 1 đến ${this.totalPages}.`;
      return false;
    }
    if (isNaN(Number(page))) {
      document.getElementById("hidden-button").click();
      (document.getElementById("pageChoice") as HTMLInputElement).value = "";
      this.message = `Trang phải là số.`;
      return false;
    }
    return true;
  }

  refreshPage() {
    (document.getElementById('nameSearch') as HTMLInputElement).value = '';
    (document.getElementById('cmndSearch') as HTMLInputElement).value = '';
    (document.getElementById('addressSearch') as HTMLInputElement).value = '';
    (document.getElementById('departmentSearch') as HTMLInputElement).value = '';
    this.department_search = '';
    this.address_search = '';
    this.cmnd_search = '';
    this.name_search = '';
    this.ngOnInit();
  }
  deleteById(id: string) {
    this.employeeService.updateStatusById(id).subscribe(value => {
      this.statusService.success('Đã xóa thành công!!!', 'Thông báo');
      this.deleteClose.nativeElement.click();
      if (this.employees.length === 1) {
        this.pageNumber = this.pageNumber - 1;
      }
      this.ngOnInit();
    });
  }
  findById(id: string) {
    this.employeeService.findById(id).subscribe(value => {
        document.getElementById('name_delete').innerText = value.name;
        (document.getElementById('id_delete') as HTMLInputElement).value = value.id;
        this.employeeView = value;
      },
      error => {
        this.ngOnInit();
      });
  }
  buildForm() {
    this.fileChose = null;
    this.formGroup = this.formBuilder.group({
      avatar: ['', [Validators.required, checkFile]],
      name: ['', [Validators.required, checkTrim,
        Validators.minLength(8),
        Validators.pattern('^[A-Za-z ÚÙỤŨỦỊỈÌỈĨÂĂÔĐÊỌÒÓÕỎÁÀẢÃẠÈÉẸẼẺƯỬỮỰỪỨỐỒỔỘỖẾỀỂỄỆẤẦẪẨẬẶẮẲẴẰẠÁÀẢÃúùụũủịỉìỉĩâăôđêọòóõỏáàảãạèéẹẽẻưửữựừứốồổộỗếềểễệấầẫẩậặắẳẵằạáàảã@#]+$'),
        Validators.maxLength(200)]],
      address: ['', [Validators.required, checkTrim, Validators.maxLength(200)]],
      birthday: ['', [Validators.required, checkBirthday]],
      email: ['', [Validators.required,
        Validators.pattern('^[\\w\\-.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      phone: ['', [Validators.required,
        Validators.pattern('^([0]|(\\+84))([0-9]{9})$')]],
      salaryScale: ['', [Validators.required]],
      department: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(1000000)]],
      id_card: ['', [Validators.required,
        Validators.pattern("^([0-9]{12})$")]],
      account: ['', [Validators.required,
        checkTrim,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern("^[A-Za-z0-9]+$")]],
      password: ['', [Validators.required, checkTrim,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,15}$"),
        Validators.maxLength(15)]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validator: [checkPasswordConfirm]
    });
  }
  saveForm() {
    this.employeeService.save(this.formGroup).subscribe(value => {
      this.statusService.success(`Đã tạo mới nhân viên ${value.name} thành công!!!`, 'Thông báo');
      document.getElementById("pop-up-container").style.display = "none";
      this.ngOnInit();
    });
  }
  saveAllForm() {
    document.getElementById("pop-up-container").style.display = "block";
    let flag = true;
    forkJoin(this.employeeService.findByPhone(this.formGroup.value.phone),
      this.employeeService.findByName(this.formGroup.value.account),
      this.employeeService.findByEmail(this.formGroup.value.email),
      this.employeeService.findByIdCard(this.formGroup.value.id_card)
    ).subscribe((result) => {
      if (result[0] === true) {
        this.formGroup.controls.phone.setErrors({phoneexists: true});
        document.getElementById("pop-up-container").style.display = "none";
        flag = false;
      }
      if (result[1] === true) {
        this.formGroup.controls.account.setErrors({accountexists: true});
        document.getElementById("pop-up-container").style.display = "none";
        flag = false;
      }
      if (result[2] === true) {
        this.formGroup.controls.email.setErrors({emailexists: true});
        document.getElementById("pop-up-container").style.display = "none";
        flag = false;
      }
      if (result[3] === true) {
        this.formGroup.controls.id_card.setErrors({idcardexists: true});
        document.getElementById("pop-up-container").style.display = "none";
        flag = false;
      }
      if (flag) {
        this.closeAddExpenseModal.nativeElement.click();
        const filePath = `employeeAvatar/${Date.now()}${this.fileChose.name}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.fileChose)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.formGroup.value.avatar = url;
                this.saveForm();
              });
            })
          )
          .subscribe();
      }
    });
  }
  changeFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList[0].size > 5000000) {
      this.formGroup.controls.avatar.setErrors({filesize: true});
      return;
    }
    this.fileChose = fileList[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.fileChose);

  }

  resetModal() {
    this.buildForm();
  }

  searchWithCondition() {
    this.findAllWithCondition(this.name_search, this.cmnd_search, this.address_search, this.department_search, 0);
  }

  getPageInChoice(page: number) {
    if (this.validPage(page)) {
      this.findAllWithCondition(this.name_search, this.cmnd_search, this.address_search, this.department_search, page);
    }
  }
}
