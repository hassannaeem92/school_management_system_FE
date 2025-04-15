import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeCollectionRoutingModule } from './fee-collection-routing.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedComponetsModule } from 'src/shared-resources/shared-components/shared-componets/shared-componets.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AllFeeCollectionComponent } from './all-fee-collection/all-fee-collection.component';
import { AddFeeCollectionComponent } from './add-fee-collection/add-fee-collection.component';
import { EditFeeCollectionComponent } from './edit-fee-collection/edit-fee-collection.component';
import { FeeInstallmentComponent } from './edit-fee-collection/fee-installment/fee-installment.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxPrintModule } from 'ngx-print';
// import { MY_FORMATS } from '../student/student.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AllFeeCollectionComponent,
    AddFeeCollectionComponent,
    EditFeeCollectionComponent,
    FeeInstallmentComponent
  ],
  imports: [
    CommonModule,
    FeeCollectionRoutingModule,
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
    NgxUiLoaderModule,
    NgxPrintModule
  ],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  
})
export class FeeCollectionModule { }
