import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponentComponent } from './employee-component.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponentComponent
  }
];

@NgModule({
  declarations: [EmployeeComponentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeeModuleModule { }
