import { Component, OnInit } from '@angular/core';
import {PlaneService} from "./services/plane.service";
import {Plane} from "./model/Plane";
import {StageService} from "./services/stage.service";
import {Stage} from "./model/Stage";
import {EmployeeViewDTO} from "../employee-module/dto/EmployeeViewDTO";

@Component({
  selector: 'app-plane-management',
  templateUrl: './plane-management.component.html',
  styleUrls: ['./plane-management.component.css']
})
export class PlaneManagementComponent implements OnInit {
  planes : Plane[];
  stages : Stage[];
  plane : Plane;
  pageNumber: number;
  totalPages: number;
  constructor(private planeService : PlaneService,private stageService : StageService) { }

  ngOnInit(): void {
    this.getAll(0);
    this.getStage();
  }
  getAll(numberPage:number){
    this.planeService.findAll(numberPage).subscribe(data=>{
      this.planes = data.content;
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
      console.log(this.planes)
    })
  }
  getStage(){
    this.stageService.findAll().subscribe(data=>{
      this.stages = data;
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
}

