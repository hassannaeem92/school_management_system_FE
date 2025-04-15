import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { AllTeacherComponent } from './all-teacher/all-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedComponetsModule } from 'src/shared-resources/shared-components/shared-componets/shared-componets.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from '../student/student.module';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { TeacherInfoComponent } from './edit-teacher/teacher-info/teacher-info.component';
import { TeacherDocumentComponent } from './edit-teacher/teacher-document/teacher-document.component';
import { TeacherImageComponent } from './edit-teacher/teacher-image/teacher-image.component';


@NgModule({
  declarations: [
    AllTeacherComponent,
    EditTeacherComponent,
    AddTeacherComponent,
    TeacherInfoComponent,
    TeacherDocumentComponent,
    TeacherImageComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class TeacherModule { }
