import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { AllClassComponent } from './all-class/all-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedComponetsModule } from 'src/shared-resources/shared-components/shared-componets/shared-componets.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ClassInfoComponent } from './edit-class/class-info/class-info.component';
import { SectionInfoComponent } from './edit-class/section-info/section-info.component';
import { AddSectionStudentComponent } from './edit-class/add-section-student/add-section-student.component';


@NgModule({
  declarations: [
    AllClassComponent,
    AddClassComponent,
    EditClassComponent,
    ClassInfoComponent,
    SectionInfoComponent,
    AddSectionStudentComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
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
  ]
})
export class ClassModule { }
