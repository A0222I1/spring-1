import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from "./module/contract-module/contract-module.module";


const routes: Routes = [
  {
  path: '', pathMatch: 'full', redirectTo: 'plane'
},
  {
  path: 'employee', component: EmployeeModuleModule
},
  {
    path: 'plane', component: PlaneModuleModule,
    // path: "", pathMatch: "full", redirectTo: "contract"
},
  {
  path: "employee", component: EmployeeModuleModule
}, {
  path: "contract", component: ContractModuleModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
