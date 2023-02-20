import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {HomePageComponent} from './module/home-page/home-page.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {AccountModule} from "./account/account.module";
import {LoginComponent} from "./account/login/login.component";
import {Role} from "./module/employee-module/model/Role";
import {AuthGuard} from "./account/guard/auth.guard";


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'employee', component: EmployeeModuleModule
    // canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
  {
    path: 'plane', component: PlaneModuleModule
    // canActivate: [AuthGuard], data: {roles: [Role.USER, Role.ADMIN, Role.EMPLOYEE]}
  },
  {
    path: 'contract', component: ContractModuleModule
    // canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.EMPLOYEE]}
  },
  {
    path: 'home', component: HomePageComponent
  }
  ,
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
