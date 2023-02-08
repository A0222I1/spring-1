import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeeModuleModule} from "./module/employee-module/employee-module.module";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {environment} from '../environments/environment';
import {ContractModuleModule} from './module/contract-module/contract-module.module';
import {FormsModule} from '@angular/forms';

@NgModule({
   declarations: [
     AppComponent,

   ],
   imports: [
     BrowserModule,
     HttpClientModule,
     EmployeeModuleModule,
     ContractModuleModule,
     AngularFireStorageModule,
     AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
     AppRoutingModule],
   providers: [],
   exports: [],
   bootstrap: [AppComponent]
 })
export class AppModule { }
