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
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


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
  areaSearch: string = "";
  stageSearch: string = "";
  statusSearch: string = "";
  typeSearch: string = "";
  files:File[]=[];
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
      this.toast.success("Xóa thành công ");
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
    return "Not Found";
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
      area:[this.plane==undefined?"":this.plane.area],
      price:[this.plane==undefined?"":this.plane.price],
      management_costs:[this.plane==undefined?"":this.plane.management_costs],
      planeStatus:[this.plane==undefined?"":this.plane.planeStatus],
      planeType:[this.plane==undefined?"":this.plane.planeType],
      stage:[this.plane==undefined?"":this.plane.stage],
      imgs:[this.plane==undefined?"":this.plane.imgs]
    })
    this.formArray = this.formBuilder.array([])
  }
  selectFile(event){
    if(event.target.files[0]!=undefined ){
      this.files.push(event.target.files[0]);
      console.log(this.files);
    }
  }
  async  submit(){
    // let src = "";
    // for (let file of this.files) {
    //   if (file.type != 'image/png' && file.type != 'image/jpeg') {
    //     console.log("sai roi")
    //   } else {
    //     let filePath = `avatar${new Date().toISOString()}${file.name}`
    //     let fileRef = this.fireStorage.ref(filePath);
    //     await this.fireStorage.upload(filePath, file).snapshotChanges().toPromise();
    //     const url = await fileRef.getDownloadURL().toPromise();
    //     src += `${url}a0222i1`;
    //   }
    // }
    this.rfForm.value.imgs="a";
    this.planeService.savePlane(this.rfForm.value).subscribe(data=>{
      this.ngOnInit();
    })
  }
  addPlane() {
    this.rfForm.reset();
  }
  addPicture() {
    if (this.formArray.length<4){
      this.formArray.push(new FormControl(null));
    }

  }

  uploadImg(event: Event, i: number) {

  }
}
