import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";
import {AdminComponent} from "./account/admin/admin.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  },
  // {
  //   path: '/admin',
  //   loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  // },
  {
    path: "admin", component: AdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
