import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {HomePageComponent} from './module/home-page/home-page.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {StaticModuleComponent} from "./module/static-module/static-module.component";
import {StaticThunhapthapComponent} from "./module/static-module/static-thunhapthap/static-thunhapthap.component";
import {StaticThunhapcaoComponent} from "./module/static-module/static-thunhapcao/static-thunhapcao.component";
import {LoginComponent} from "./account/login/login.component";
import {AuthGuard} from "./account/guard/auth.guard";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: "employee", component: EmployeeModuleModule
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
  , {
    path: "static", component: StaticModuleComponent, canActivate: [AuthGuard]
  }
  , {
    path: "static/low", component: StaticThunhapthapComponent, canActivate: [AuthGuard]
  }
  , {
    path: "static/high", component: StaticThunhapcaoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
