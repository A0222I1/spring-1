import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {parse} from 'ts-node';
import {Plane} from '../plane-module/model/Plane';
import {PlaneService} from '../plane-module/services/plane.service';

@Component({
  selector: 'app-contract-component',
  templateUrl: './contract-component.component.html',
  styleUrls: ['./contract-component.component.css']
})
export class ContractComponentComponent implements OnInit {
  formGroup: FormGroup;
  formattedNumber: any;
  plane: Plane[];
  constructor(private planeService: PlaneService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = new FormGroup({
      termId : new FormControl(''),
      price: new FormControl(''),
      total: new FormControl(''),
      information: new FormControl(''),
      startDate: new FormControl(''),
      customerId: new FormControl(''),
      employeeId: new FormControl('NV_0003'),
      planeId: new FormControl('')
    });
  }
 

  saveAllForm() {

  }

  forMatNumber(value: any) {
    this.formattedNumber = new Intl.NumberFormat().format(parseFloat(value.replace(/,/g, '')));
    // @ts-ignore
    this.formGroup.patchValue({
      // tslint:disable-next-line:radix
      price: this.formattedNumber === 'NaN' ? '' : this.formattedNumber
    });
  }
}
