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

  areaSearch: string = "";
  stageSearch: string = "";
  statusSearch: string = "";
  typeSearch: string = "";
  constructor(private contractService :ContractServiceService,
              private toast: ToastrService,
              private planeService : PlaneService,private stageService : StageService, private planeTypeService :PlaneTypeService,private planeStatusService : PlaneStatusService) { }

  ngOnInit(): void {
    this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,0);
    this.getStage();
    this.getPlaneType();
    this.getContracts();
    this.getPlaneStatus();
  }

  getAll(area:string, stage: string, status: string, type: string,numberPage:number){
    this.planeService.findAll(area,stage,status,type,numberPage).subscribe(data=>{
      console.log(data);
      this.planes = data.content;
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
  getContracts(){
    this.contractService.getContractPlane().subscribe(data=>{
      this.contracts = data;
      console.log(data);

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
    this.areaSearch='';
    this.statusSearch='';
    this.typeSearch='';
    this.stageSearch='';
  }

  addPlane() {

  }
}

