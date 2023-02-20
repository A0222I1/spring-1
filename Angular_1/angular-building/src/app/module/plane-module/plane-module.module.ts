import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneManagementComponent } from './plane-management.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CustomPipeVND} from "./utils/customPipeVND";
import {AuthGuard} from "../../account/guard/auth.guard";
const routes: Routes = [
  {
    path: 'plane', component: PlaneManagementComponent, canActivate: [AuthGuard]
  }
]
@NgModule({
  declarations: [PlaneManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ]
})
export class PlaneModuleModule {
}
