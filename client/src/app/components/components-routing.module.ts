import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainViewComponent } from './main-view.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'student',
        canActivate: [AuthGuard],
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },

      {
        path: 'class',
        canActivate: [AuthGuard],
        loadChildren: () => import('./class/class.module').then(m => m.ClassModule)
      },

      {
        path: 'teacher',
        canActivate: [AuthGuard],
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
      },

      {
        path: 'feeCollection',
        canActivate: [AuthGuard],
        loadChildren: () => import('./fee-collection/fee-collection.module').then(m => m.FeeCollectionModule)
      },

    ]
  }

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
