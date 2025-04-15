import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },

  {
    path: '',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
    
  },

  // canActivate: [AuthGuard],
  // runGuardsAndResolvers: 'always'


];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
  
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always'}),
    AuthenticationModule
  ],
  exports: [RouterModule]
})  
  
export class AppRoutingModule { }
