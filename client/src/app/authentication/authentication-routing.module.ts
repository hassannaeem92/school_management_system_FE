import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from '../guards/guest.guard';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterAdminComponent,
  
    // canActivate: [GuestGuard]
  },

  {
    path: 'forget-password',
    component: LoginComponent,
    
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // {
  //   path: '**',
  //   component: ,
    
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
