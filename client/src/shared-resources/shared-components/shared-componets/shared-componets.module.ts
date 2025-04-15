import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponetsRoutingModule } from './shared-componets-routing.module';
import { CanvasImageComponent } from './canvas-image/canvas-image.component';
import { WebcamModule } from 'ngx-webcam';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { TableFooterComponent } from './table-footer/table-footer.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    CanvasImageComponent,
    UploadDocumentComponent,
    TableFooterComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    SharedComponetsRoutingModule,
    WebcamModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatOptionModule,


    MatIconModule,
    MatSelectModule,
   
   
    
  ],
  exports: [
    CanvasImageComponent,
    UploadDocumentComponent,
    TableFooterComponent,
    ConfirmationModalComponent
    
  ]
})
export class SharedComponetsModule { }
