import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTeacherComponent } from './all-teacher/all-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherInfoComponent } from './edit-teacher/teacher-info/teacher-info.component';
import { TeacherDocumentComponent } from './edit-teacher/teacher-document/teacher-document.component';
import { TeacherImageComponent } from './edit-teacher/teacher-image/teacher-image.component';

const childRoutes: Routes = [
  
  {
    path: '',
    component: TeacherInfoComponent
  },
  {
    path: 'document',
    component: TeacherDocumentComponent
  },

  {
    path: 'image',
    component: TeacherImageComponent
  },

  
]

const routes: Routes = [

  
  {
    path: '',
    component: AllTeacherComponent
  },


 {
    path: 'add',
    component: AddTeacherComponent
},
{
  path: 'edit/:id',
  component: EditTeacherComponent,
  children: childRoutes
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
