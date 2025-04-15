import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStudentComponent } from './all-student/all-student.component';
import { AddUpdateStudentComponent } from './add-update-student/add-update-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddUpdateParentComponent } from './edit-student/add-update-parent/add-update-parent.component';
import { StudentEditComponent } from './edit-student/student-edit/student-edit.component';
import { AddUpdateGuardianComponent } from './edit-student/add-update-guardian/add-update-guardian.component';
import { AddUpdateReceiverComponent } from './edit-student/add-update-receiver/add-update-receiver.component';
import { AddUpdateDocumentComponent } from './edit-student/add-update-document/add-update-document.component';
import { AddUpdateStudenImageComponent } from './edit-student/add-update-studen-image/add-update-studen-image.component';
import { AddUpdateFeeComponent } from './edit-student/add-update-fee/add-update-fee.component';


const childRoutes: Routes = [
  
  {
    path: '',
    component: StudentEditComponent
  },
  {
    path: 'parent',
    component: AddUpdateParentComponent
  },

  {
    path: 'guardian',
    component: AddUpdateGuardianComponent
  },

  {
    path: 'receiver',
    component: AddUpdateReceiverComponent
  },

  {
    path: 'document',
    component: AddUpdateDocumentComponent
  },
  {
    path: 'image',
    component: AddUpdateStudenImageComponent
  },

  {
    path: 'fee',
    component: AddUpdateFeeComponent
  },
  
]

const routes: Routes = [

  {
    path: '',
    component: AllStudentComponent
  },
  {
    path: 'add',
    component: AddUpdateStudentComponent
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent,
    children: childRoutes
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
