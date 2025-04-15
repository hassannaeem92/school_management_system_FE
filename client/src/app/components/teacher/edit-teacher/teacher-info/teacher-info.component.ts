import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StudentService } from 'src/app/services/student/student.service';

import { Page } from 'src/shared-resources/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Utils } from 'src/shared-resources/shared-components/shared-componets/utils';
import * as Noty from 'noty';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/shared-resources/_services/common.service';
import * as moment from "moment";
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent {
  model: any = {};
  minDate: any;
  maxDate: any;
  paramsId: any;
  mode: any;
  activityType: any = "home";
  docModel: any = {};
  bloodGroup: any = [];
  religion: any = [];
  gender: any = [];
  parentModel: any = {};
  receiverModel: any = {};
  bloodGroupArray: any = [];
  lessDate: any;


  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required";
  formData: FormData = new FormData();
  documentModel: any = {
    student_id: "",
    birth_certificate: "",
    b_form: "",
    character_certificate: "",
    previous_school_result_card: "",
  };

  constructor(
    private commonService: CommonService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private teacherService: TeacherService,

    private dropdownService: DropdownServiceService
  ) {}
  ngOnInit(): void {
    this.ngxService.start()
    this.minDate = new Date();
    this.maxDate = new Date();
    this.lessDate = moment('2000-01-01');
    this.model.status = true;

    // this.getBloodGroups();
    // this.getReligions();
    // this.getGender();

    const rliigonGet = this.studentService.getReligionArray();
    const bloodGet = this.studentService.getBloodGroupsArray();
    const genderGet = this.studentService.getGenderArray();
   
    forkJoin([rliigonGet, bloodGet, genderGet]).subscribe((data) => {
      if (data[0] && data[0].data.religions && data[0].data.religions.length) {
        var groups = data[0].data.religions;
        this.religionArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.religion,
          };
        });
      } else {
      }


      if (data[1] && data[1].data.blood_groups && data[1].data.blood_groups.length) {
        var groups = data[1].data.blood_groups;
        this.bloodGroupArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.blood_group,
          };
        });
      } else {
      }

      if (data[2] && data[2].data.genders && data[2].data.genders.length) {
        var groups = data[2].data.genders;
        this.genderArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.gender,
          };
        });
      } else {
      }


      this.route.params.subscribe((paramsId: any) => {
        if (paramsId && paramsId.id) {
          this.paramsId = paramsId.id
          this.mode = "edit";
          this.getById(paramsId.id);
        } else {
          this.mode = "create";
        }
      });

    })

   

   
   
  }

  getById(paramId: any) {

    
    this.teacherService.getTeacher(paramId).subscribe((data) => {
      if (data && data.responseCode == 200) {
        
        var result = data.data;

        this.model.firstName = result.first_name,
          this.model.lastName = result.last_name
            this.model.placeOfBirth = result.place_of_birth
            this.model.phone = result.phone_number
            this.model.email = result.email
            this.model.dateOfBirth = result.date_of_birth
            this.model.registrationDate = result.registration_date
         
            this.model.status = result.status == 'Active' ? true : false;
            this.model.religion = this.religionArray.find((x: any) => x.id ==  result.religion_id);
            this.model.gender =  this.genderArray.find((x: any) => x.id ==  result.gender.id); 
            this.model.bloodGroup = this.bloodGroupArray.find((x: any) => x.id ==  result.blood_group_id);
            this.model.registrationNumber = result.registration_number;
            this.model.experience_in_years = result.experience_in_years;

      }
      this.ngxService.stop()
    });

  }

  clearForm(name: any, form: any) {
    this.model = {};
    if (name == "parent") {
      this.parentModel = {};
    }
    if (name == "receiver") {
      this.receiverModel = {};
    }
    if (name == "") {
      this.parentModel = {};
    }
    if (name == "teacher") {
      this.model = {};
      form.form.markAsPristine();
      form.form.markAsUntouched();
    }
    if (name == "parent") {
      this.parentModel = {};
    }
    if (name == "parent") {
      this.parentModel = {};
    }
  }

  getBloodGroups() {
    this.studentService.getBloodGroupsArray().subscribe((data) => {
      if (data && data.data.blood_groups && data.data.blood_groups.length) {
        var groups = data.data.blood_groups;
        this.bloodGroupArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.blood_group,
          };
        });
      } else {
      }
    });
  }

  onlyDecimalNumberKey(event: any) {
    return this.commonService.onlyDecimalNumberKey(event);
  }

  getReligions() {
    this.studentService.getReligionArray().subscribe((data) => {
      if (data && data.data.religions && data.data.religions.length) {
        var groups = data.data.religions;
        this.religionArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.religion,
          };
        });
      } else {
      }
    });
  }

  getGender() {
    this.studentService.getGenderArray().subscribe((data) => {
      if (data && data.data.genders && data.data.genders.length) {
        var groups = data.data.genders;
        this.genderArray = groups.map((x: any) => {
          return {
            id: x.id,
            name: x.gender,
          };
        });
      } else {
      }
    });
  }

  

  create(f: NgForm) {
    this.ngxService.start()

    this.model;

    this.bloodGroup;

    const body = {
      first_name: this.model.firstName,
      last_name: this.model.lastName,
      date_of_birth: moment(this.model.dateOfBirth).format("YYYY-MM-DD"),
      registration_date: moment(this.model.registrationDate).format("YYYY-MM-DD"),
      place_of_birth: this.model.placeOfBirth,
      phone_number: this.model.phone,
      //optionail fields
      email: this.model.email ? this.model.email : '',
      blood_group_id: this.model.bloodGroup ? this.model.bloodGroup.id.toString() : null,
      religion_id: this.model.religion ? this.model.religion.id.toString() : null,
      gender_id: this.model.gender ? this.model.gender.id.toString() : null,
      experience_in_years: parseInt(this.model.experience_in_years),
      status: this.model.status ? "true" : "false",
      id: parseInt(this.paramsId)
    };

    setTimeout(() => {
      this.teacherService.updateTeacher(body).subscribe((data: any) => {
        if (data && data.responseCode == 200) {
          this.router.navigate(["/teacher"]);
          this.toastr.success(data.responseMessage);
          this.ngxService.stop()

        } else if(data && data.message == 'Invalid data sent!'){
          this.toastr.error(data.message);  
          
        }
      });
  

    });
    this.model = {};
  }

 

  isActive(event: any) {
    if (event.checked) {
      this.model.status = true;
    } else {
      this.model.status = false;
    }
  }


  downloadFile() {}

  onItemSelect(labelId: any, event: any) {}

  onItemDeSelect(labelId: any, selectId: any) {}

  onSelectAll(labelId: any) {}

  onDeSelectAll(labelId: any) {}
}
