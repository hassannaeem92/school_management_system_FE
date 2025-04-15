import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllClassComponent } from './all-class/all-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { ClassInfoComponent } from './edit-class/class-info/class-info.component';
import { SectionInfoComponent } from './edit-class/section-info/section-info.component';
import { AddSectionStudentComponent } from './edit-class/add-section-student/add-section-student.component';


const childRoutes: Routes = [
  
  {
    path: '',
    component: ClassInfoComponent
  },
  {
    path: 'section',
    component: SectionInfoComponent
  },

  {
    path: 'addStudentSection',
    component: AddSectionStudentComponent
  },

  
]

const routes: Routes = [

  {
    path: '',
    component: AllClassComponent
  },


 {
    path: 'add',
    component: AddClassComponent
},
  {
    path: 'edit/:id',
    component: EditClassComponent,
    children: childRoutes

  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
