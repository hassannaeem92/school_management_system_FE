import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AllStudentComponent } from './all-student/all-student.component';
import { AddUpdateStudentComponent } from './add-update-student/add-update-student.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { SharedComponetsModule } from 'src/shared-resources/shared-components/shared-componets/shared-componets.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddUpdateParentComponent } from './edit-student/add-update-parent/add-update-parent.component';
import { StudentEditComponent } from './edit-student/student-edit/student-edit.component';
import { AddUpdateGuardianComponent } from './edit-student/add-update-guardian/add-update-guardian.component';
import { AddUpdateReceiverComponent } from './edit-student/add-update-receiver/add-update-receiver.component';
import { AddUpdateDocumentComponent } from './edit-student/add-update-document/add-update-document.component';
import { AddUpdateStudenImageComponent } from './edit-student/add-update-studen-image/add-update-studen-image.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AddUpdateFeeComponent } from './edit-student/add-update-fee/add-update-fee.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};


@NgModule({
  declarations: [
    AllStudentComponent,
    AddUpdateStudentComponent,
    EditStudentComponent,
    AddUpdateParentComponent,
    StudentEditComponent,
    AddUpdateGuardianComponent,
    AddUpdateReceiverComponent,
    AddUpdateDocumentComponent,
    AddUpdateStudenImageComponent,
    AddUpdateFeeComponent,
  
    
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    
    NgxDatatableModule,
    MatDatepickerModule,
    SharedComponetsModule,
    MatCheckboxModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
    
  ],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    
  ],
})
export class StudentModule { }
