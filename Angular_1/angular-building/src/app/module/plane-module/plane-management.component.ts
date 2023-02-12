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
  plane : Plane;
  pageNumber: number;
  totalPages: number;

  areaSearch: string = "";
  stageSearch: string = "";
  statusSearch: string = "";
  typeSearch: string = "";
  constructor(private planeService : PlaneService,private stageService : StageService, private planeTypeService :PlaneTypeService,private planeStatusService : PlaneStatusService) { }

  ngOnInit(): void {
    this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,0);
    this.getStage();
    this.getPlaneType();
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
    })
  }

  changeArea(value: string) {
    if(+value < 0){
      return;
    }
    this.areaSearch = value;
  }
}

