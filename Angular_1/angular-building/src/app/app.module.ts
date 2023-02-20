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
import {StaticModuleComponent} from "./module/static-module/static-module.component";
// import {MatTabsModule} from '@angular/material/tabs';
import {ChartsModule} from "ng2-charts";
import { StaticThunhapcaoComponent } from './module/static-module/static-thunhapcao/static-thunhapcao.component';
import { StaticThunhapthapComponent } from './module/static-module/static-thunhapthap/static-thunhapthap.component';
import {ExcelDataType} from "xlsx";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    CustomPipeVND,
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
        EmployeeModuleModule,
        ContractModuleModule,
        PlaneModuleModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
        AppRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        // MatTabsModule,
        ToastrModule.forRoot(
            {
                timeOut: 2000,
                positionClass: 'toast-top-right'

            }
        ),
        ReactiveFormsModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})

export class AppModule {
}
