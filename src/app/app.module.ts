import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './module/material-module/material-module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { SignInComponent } from './component/auth/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/navigation/header/header.component';
import { SideBarComponent } from './component/navigation/side-bar/side-bar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { EditUserComponent } from './component/user/edit-user/edit-user.component';
import { AllUserComponent } from './component/user/all-user/all-user.component';
import { ClientSearchComponent } from './component/client/client-search/client-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    AllUserComponent,
    ClientSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
