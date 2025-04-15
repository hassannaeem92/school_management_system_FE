import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { RegisterAdminComponent } from './register-admin/register-admin.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
