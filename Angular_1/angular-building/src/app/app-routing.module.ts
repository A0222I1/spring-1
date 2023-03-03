import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {HomePageComponent} from './module/home-page/home-page.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {StaticModuleComponent} from "./module/static-module/static-module.component";
import {StaticThunhapcaoComponent} from "./module/static-module/static-thunhapcao/static-thunhapcao.component";
import {StaticThunhapthapComponent} from "./module/static-module/static-thunhapthap/static-thunhapthap.component";
import {LoginComponent} from './account/login/login.component';
import {AuthGuard} from './account/guard/auth.guard';
import {CustomerModuleModule} from './module/customer-module/customer-module.module';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'employee', component: EmployeeModuleModule
  },
  {
    path: 'customer', component: CustomerModuleModule
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
    path: 'home', component: HomePageComponent,
    data: {
      title: 'A0222I1 Rental'
    }
  }
  , {
    path: 'static', component: StaticModuleComponent, canActivate: [AuthGuard],
    data: {
      title: 'Báo cáo tổng hợp'
    }
  }
  , {
    path: 'static/low', component: StaticThunhapthapComponent, canActivate: [AuthGuard],
    data: {
      title: 'Báo cáo thu nhập thấp'
    }
  }
  , {
    path: 'static/high', component: StaticThunhapcaoComponent, canActivate: [AuthGuard],
    data: {
      title: 'Báo cáo thu nhập cao'
    }
  },
  {
    path: 'login', component: LoginComponent,
    data: {
      title: 'Đăng nhập'
    }
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
