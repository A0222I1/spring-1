import { Component, OnInit } from '@angular/core';
import {PlaneService} from "./services/plane.service";
import {Plane} from "./model/Plane";
import {StageService} from "./services/stage.service";
import {Stage} from "./model/Stage";
import {EmployeeViewDTO} from "../employee-module/dto/EmployeeViewDTO";
import {PlaneType} from "./model/PlaneType";
import {PlaneTypeService} from "./services/plane-type.service";
import {PlaneStatusService} from "./services/plane-status.service";
import {PlaneStatus} from "./model/PlaneStatus";
import {ContractViewDTO} from "../contract-module/dto/ContractViewDTO";
import {ContractServiceService} from "../contract-module/service/contract-service.service";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-plane-management',
  templateUrl: './plane-management.component.html',
  styleUrls: ['./plane-management.component.css']
})
export class PlaneManagementComponent implements OnInit {
  planes : Plane[];
  stages : Stage[];
  planeTypes : PlaneType[];
  planeStatus : PlaneStatus[];
  contracts: ContractViewDTO[]=[];
  plane : Plane;
  pageNumber: number;
  totalPages: number;
  rfForm : FormGroup;
  message="";
  areaSearch: string = "";
  stageSearch: string = "";
  statusSearch: string = "";
  typeSearch: string = "";
  formArray : FormArray;
  constructor(private formBuilder : FormBuilder,
              private fireStorage : AngularFireStorage,private contractService :ContractServiceService,
              private toast: ToastrService,
              private planeService : PlaneService,private stageService : StageService,
              private planeTypeService :PlaneTypeService,private planeStatusService : PlaneStatusService) { }

  ngOnInit(): void {
    this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,0);
    this.getStage();
    this.getPlaneType();
    this.getContracts();
    this.getPlaneStatus();
    this.buidThisForm();

  }

  getAll(area:string, stage: string, status: string, type: string,numberPage:number){
    this.planeService.findAll(area,stage,status,type,numberPage).subscribe(data=>{
      this.planes = data.content;
      if (this.planes.length==0){
        this.toast.error("Không có mặt bằng nào theo kết quả tìm kiếm.");
        this.resetSearch();
        return;
      }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
  getContracts(){
    this.contractService.getContractPlane().subscribe(data=>{
      this.contracts = data;

    })
  }
  getStage(){
    this.stageService.findAll().subscribe(data=>{
      this.stages = data;
    })
  }
  getPlaneType(){
    this.planeTypeService.findAll().subscribe(data=>{
      this.planeTypes = data;
    })
  }
  getPlaneStatus(){
    this.planeStatusService.findAll().subscribe(data=>{
      this.planeStatus = data;
    })
  }
  getInfo(plane){
    this.plane = plane;
    this.buidThisForm();
  }

  deletePlane(id: number) {
    this.planeService.deletePlane(id).subscribe(data=>{
      this.ngOnInit();
      this.toast.success("Xóa thành công.");
    })
  }
  changeArea(value: string) {
    if(+value < 0){
      return;
    }
    this.areaSearch = value;
  }

  getCustomerName(id) {
    let contractViewDTO : ContractViewDTO;
    contractViewDTO = this.contracts.find(item=>{
      return item.planeId == id;
    })
    if(contractViewDTO) return contractViewDTO.customerName;
    return "Chưa có";
  }
  resetSearch(){
    this.getAll('','','','',0);
    (document.getElementById('exampleFormControlSelect1') as HTMLSelectElement).value='';
    (document.getElementById('exampleFormControlSelect2') as HTMLSelectElement).value='';
    (document.getElementById('exampleFormControlSelect3') as HTMLSelectElement).value='';
    (document.getElementById('inputArea') as HTMLInputElement).value='';
    this.areaSearch='';
    this.statusSearch='';
    this.typeSearch='';
    this.stageSearch='';
  }
  buidThisForm(){
    this.getStage();
    this.getPlaneType();
    this.getPlaneStatus();
    this.rfForm = this.formBuilder.group({
      id:[this.plane==undefined?"":this.plane.id],
      area:[this.plane==undefined?"":this.plane.area,[Validators.pattern("^\\d{0,}$"),this.validThan0]],
      price:[this.plane==undefined?"":this.plane.price,[Validators.pattern("^\\d{0,}$"),this.validThan0]],
      management_costs:[this.plane==undefined?"":this.plane.management_costs,[Validators.pattern("^\\d{0,}$"),this.validThan0]],
      planeStatus:[this.plane==undefined?"":this.plane.planeStatus,[Validators.required]],
      planeType:[this.plane==undefined?"":this.plane.planeType,[Validators.required]],
      stage:[this.plane==undefined?"":this.plane.stage,[Validators.required]],
      imgs:[this.plane==undefined?"":this.plane.imgs]
    })
    this.formArray = this.formBuilder.array([])
  }
  async submit(){
    let src = "";
    document.getElementById("pop-up-container").style.display="block";
    for (let [index,file] of this.formArray.controls.entries()) {
      if (file.value!=null){
        if (file.value.file.type != 'image/png' && file.value.file.type != 'image/jpeg') {
        } else {
          let filePath = `avatar${new Date().toISOString()}${file.value.file.name}`
          let fileRef = this.fireStorage.ref(filePath);
          await this.fireStorage.upload(filePath, file.value.file).snapshotChanges().toPromise();
          const url = await fileRef.getDownloadURL().toPromise();
            src+=`${url}a0222i1`;
        }
      }
      continue;
    }
    this.rfForm.value.imgs=src.replace(/a0222i1$/, '');
    this.planeService.savePlane(this.rfForm.value).subscribe(data=>{
      // this.ngOnInit();
      this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,this.pageNumber)
      document.getElementById("pop-up-container").style.display="none";
      this.toast.success("Thêm mới thành công.");
    },error =>{

    })
  }
  addPlane() {
    this.rfForm.reset();
    this.formArray.clear();
  }
  addPicture() {
    if (this.formArray.length<4){
      this.formArray.push(new FormControl("",Validators.required));
    }
    // if (this.formArray.length<4){
    //   this.formArray.push(new FormGroup({
    //     file : new FormControl("",Validators.required),
    //   }));
    // }
    // console.log(this.formArray.controls[0].value);
  }
  uploadImg(event, i: number) {
    const fileName = event.target.files[0];
    if (fileName){
      this.formArray.controls[i].patchValue({"file": fileName});
    }
    let idImg = document.getElementById(`label-img${i}`) as HTMLImageElement;
    let reader = new FileReader();
    reader.readAsDataURL(fileName)
    reader.onload = function() {
        idImg.src = reader.result as string;
    }

  }
  validThan0(c:AbstractControl){
    const v = c.value;
    if(v<=0){
      return{
        "validMoreThan0":true
      }
    }
    return null;
  }
  removeImg(i: number) {
    if (this.formArray.controls[i].value){
      this.formArray.controls.splice(i,1);
    }
  }
  getPageChoice(page){
    if (this.validPage(page)){
      this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,page);
    }
  }
  validPage(page:number){
    if (page>= this.totalPages || page<0){
      this.toast.error(`Trang chỉ nên trong khoảng từ 1 đến ${this.totalPages}.`);
      // this.message="Trang chỉ nên trong khoảng từ 1 đến " + this.totalPages+".";
      // document.getElementById("button-notification").click();
      (document.getElementById("input-page-choice") as HTMLInputElement).value="";
      return false;
    }
    if (isNaN(Number(page))){
      this.toast.error("Trang chọn phải là số.");
      (document.getElementById("input-page-choice") as HTMLInputElement).value="";
    }
    return true;
  }
}
