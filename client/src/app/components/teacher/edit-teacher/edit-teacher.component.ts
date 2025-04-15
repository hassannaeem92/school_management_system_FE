import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import { NgForm } from "@angular/forms";
import * as moment from "moment";
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent {
 
}
