import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {PlaneModuleModule} from "./module/plane-module/plane-module.module";
import {CommonModule} from "@angular/common";
import {CustomPipeVND} from "./module/plane-module/utils/customPipeVND";
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CustomPipeVND
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
    ContractModuleModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
