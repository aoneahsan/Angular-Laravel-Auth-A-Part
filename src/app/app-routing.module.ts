import { AdminFranchiseGuardService } from './guard/user/admin-franchise-guard-service';
import { PropertyEditComponent } from './component/property/property-edit/property-edit.component';
import { PropertyComponent } from './component/property/property.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './service/auth/auth-guard.service';
import { UnAuthGuardService } from './service/auth/unauth-guard-service';
import { SuperAdminRoleGuardService } from './guard/user/super-admin-guard.service';
import { ClientRoleGuardService } from './guard/user/client-guard-service';

import { HomeComponent } from './component/home/home.component';
import { SignInComponent } from './component/auth/sign-in/sign-in.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { EditUserComponent } from './component/user/edit-user/edit-user.component';
import { AllUserComponent } from './component/user/all-user/all-user.component';
import { ClientSearchComponent } from './component/client/client-search/client-search.component';
import { PropertyAddComponent } from './component/property/property-add/property-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UnAuthGuardService]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [UnAuthGuardService]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [UnAuthGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [AuthGuardService, SuperAdminRoleGuardService]
  },
  {
    path: "edit-profile",
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "all-user",
    component: AllUserComponent,
    canActivate: [AuthGuardService, SuperAdminRoleGuardService]
  },
  {
    path: "client-search-area",
    component: ClientSearchComponent,
    canActivate: [AuthGuardService, ClientRoleGuardService]
  },
  {
    path: "properties",
    component: PropertyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "property-add",
    component: PropertyAddComponent,
    canActivate: [AuthGuardService, AdminFranchiseGuardService]
  },
  {
    path: "property-edit/:id",
    component: PropertyEditComponent,
    canActivate: [AuthGuardService, AdminFranchiseGuardService]
  },
  {
    path: "property-delete/:id",
    component: PropertyEditComponent,
    canActivate: [AuthGuardService, AdminFranchiseGuardService]
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
