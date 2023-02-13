import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from "./module/contract-module/contract-module.module";
import {StaticModuleComponent} from "./module/static-module/static-module.component";


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
  , {
    path: "static", component: StaticModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
