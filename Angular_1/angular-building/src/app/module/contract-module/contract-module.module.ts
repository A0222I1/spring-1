import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponentComponent } from './contract-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponentComponent} from "../employee-module/employee-component.component";
import {FormatNumberPipe} from './utils/FormatNumberPipe';
import {AppModule} from '../../app.module';

const routes: Routes = [
  {
    path: 'contract', component: ContractComponentComponent
  }
]

@NgModule({
  declarations: [ContractComponentComponent,
    FormatNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ContractModuleModule { }
