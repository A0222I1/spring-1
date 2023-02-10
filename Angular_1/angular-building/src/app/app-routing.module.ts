import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";
import {CustomerModuleComponent} from "./module/customer-module/customer-module.component";


const routes: Routes = [
  {
  path: "", pathMatch: "full", redirectTo: "employee"
},
  {
  path: "employee", component: EmployeeModuleModule
},
  {
    path: "customer", component: CustomerModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
