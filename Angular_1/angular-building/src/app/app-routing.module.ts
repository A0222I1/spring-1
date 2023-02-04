import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";


const routes: Routes = [
  {
  path: "", pathMatch: "full", redirectTo: "employee"
},
  {
  path: "employee", component: EmployeeModuleModule
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
