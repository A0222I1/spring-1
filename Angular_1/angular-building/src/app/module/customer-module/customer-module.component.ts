import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-module',
  templateUrl: './customer-module.component.html',
  styleUrls: ['./customer-module.component.css']
})
export class CustomerModuleComponent implements OnInit {
  formGroup: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
