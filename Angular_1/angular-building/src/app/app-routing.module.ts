import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
<<<<<<< HEAD
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";
import {CustomerModuleComponent} from "./module/customer-module/customer-module.component";
=======
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {HomePageComponent} from './module/home-page/home-page.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
>>>>>>> 08b8a390285ed7cb29a6b304d0547af76e62ef66


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
<<<<<<< HEAD
  path: "employee", component: EmployeeModuleModule
},
  {
    path: "customer", component: CustomerModuleComponent
=======
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
>>>>>>> 08b8a390285ed7cb29a6b304d0547af76e62ef66
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
