import { Component, OnInit } from '@angular/core';
import {PlaneService} from "../employee-module/service/plane.service";
import {Plane} from "../employee-module/model/Plane";

@Component({
  selector: 'app-plane-management',
  templateUrl: './plane-management.component.html',
  styleUrls: ['./plane-management.component.css']
})
export class PlaneManagementComponent implements OnInit {
  planes : Plane[];
  constructor(private planeService : PlaneService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.planeService.findAll().subscribe(data=>{
      this.planes = data;
      console.log(this.planes)
    })
  }
}
