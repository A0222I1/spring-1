import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeModuleModule} from './module/employee-module/employee-module.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HomePageComponent} from './module/home-page/home-page.component';
import {HeaderComponent} from './module/header/header.component';
import {FooterComponent} from './module/footer/footer.component';
import {PlaneModuleModule} from './module/plane-module/plane-module.module';
import {CommonModule, DatePipe} from '@angular/common';
import {CustomPipeVND} from './module/plane-module/utils/customPipeVND';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StaticModuleComponent} from './module/static-module/static-module.component';
import {StaticThunhapcaoComponent} from './module/static-module/static-thunhapcao/static-thunhapcao.component';
import {StaticThunhapthapComponent} from './module/static-module/static-thunhapthap/static-thunhapthap.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerModuleModule} from './module/customer-module/customer-module.module';
import {AccountModule} from './account/account.module';
import {AuthGuard} from './account/guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    StaticModuleComponent,
    StaticThunhapcaoComponent,
    StaticThunhapthapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AccountModule,
    EmployeeModuleModule,
    ContractModuleModule,
    PlaneModuleModule,
    CustomerModuleModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    )
  ],
  exports: [],
  providers: [DatePipe, AuthGuard, DatePipe, CustomPipeVND],
  bootstrap: [AppComponent]
})

export class AppModule {
}
