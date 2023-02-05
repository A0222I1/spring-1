import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneManagementComponent } from './plane-management.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {
    path: 'plane', component: PlaneManagementComponent
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
