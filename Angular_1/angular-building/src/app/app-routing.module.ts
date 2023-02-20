import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {HomePageComponent} from './module/home-page/home-page.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {StaticModuleComponent} from "./module/static-module/static-module.component";
import {StaticThunhapthapComponent} from "./module/static-module/static-thunhapthap/static-thunhapthap.component";
import {StaticThunhapcaoComponent} from "./module/static-module/static-thunhapcao/static-thunhapcao.component";


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'employee', component: EmployeeModuleModule
  },
  {
    path: 'employee', component: EmployeeModuleModule
  },
  {
    path: 'plane', component: PlaneModuleModule,
  },
  {
    path: 'employee', component: EmployeeModuleModule
  },
  {
    path: 'contract', component: ContractModuleModule
  },
  {
    path: 'home', component: HomePageComponent
  }
  , {
    path: "static", component: StaticModuleComponent
  }
  , {
    path: "static/low", component: StaticThunhapthapComponent
  }
  , {
    path: "static/high", component: StaticThunhapcaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
