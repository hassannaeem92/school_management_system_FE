import { CommonService } from "./../../../../shared-resources/_services/common.service";
import { DropdownServiceService } from "./../../../../shared-resources/_services/dropdown-service.service";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { StudentService } from "src/app/services/student/student.service";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-add-update-student",
  templateUrl: "./add-update-student.component.html",

  // template: `
  //       <!-- <h1>Angular ng-select <small class="text-muted"><a target="_blank" href="https://github.com/ng-select/ng-select">Open in Github</a></small></h1> -->
  //       <label>Your first ng-select</label>
  //       <ng-select [items]="bloodGroupArray"
  //                  bindLabel="name"
  //                  placeholder="Select city"
  //                  [(ngModel)]="bloodGroup">
  //       </ng-select>
  //       <p>
  //           Selected city: {{bloodGroup | json}}
  //       </p>
  // `,
  styleUrls: ["./add-update-student.component.scss"],
})
export class AddUpdateStudentComponent {
  model: any = {};
  minDate: any;
  maxDate: any;

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
    private dropdownService: DropdownServiceService
  ) {}
  ngOnInit(): void {
    
    this.minDate = new Date();
    this.maxDate = new Date();
    this.lessDate = moment('2000-01-01');
    this.model.status = true;
    this.model.registrationDate = new Date();
    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.mode = "edit";
        this.getById(paramsId.id);
      } else {
        this.mode = "create";
      }
    });

    this.getBloodGroups();
    this.getReligions();
    this.getGender();
  }

  getById(paramId: any) {}

  clearForm(name: any, form:any) {
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
    if (name == "student") {
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

  updatePaernt() {
    this.parentModel.student_id = 12;
    this.studentService.createStudent(this.parentModel).subscribe((data) => {
      data;
    });
  }

  updateReceiver() {
    this.parentModel.student_id = 12;
    this.studentService.createStudent(this.receiverModel).subscribe((data) => {
      data;
    });
  }

  // updateDocument() {
  //   this.studentService.uploadDocument(this.formData).subscribe((data: any) => {
  //     data;
  //   });
  // }

  // onSelectFile(event: any, fileType: any) {

  //   var fileName = null;
  //   var fileSelect: any;
  //   var url;
  //   if (event.target.files && event.target.files[0]) {
  //     fileName = event.target.files[0].name;
  //     fileSelect = event.target.files[0];
  //     const reader = new FileReader();
  //     if ((
  //       fileSelect.type === 'application/xlsx' ||
  //       fileSelect.type === 'application/vnd.ms-excel' ||
  //       fileSelect.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
  //       fileSelect.type === 'application/vnd.ms-access' || fileSelect.type === 'application/pdf')
  //     ) {
  //       reader.readAsDataURL(event.target.files[0]); // read file as data url
  //       reader.onload = (events: any) => { // called once readAsDataURL is completed
  //         url = events.target.result;
  //       };
  //       // body.documentAttachmentName = this.file.nativeElement.files[0].name;
  //       // Utils.showLoader('.page-body');
  //
  //       this.studentService.uploadDocument(
  //         event.target.files[0]).subscribe((data: any) => {
  //           let datacode = data.code;
  //           if (datacode === 201) {
  //             if (data.result) {
  //               this.model.details = data.result;
  //               if (this.model.details.length) {
  //                 // this.model.details.forEach((element, i) => {
  //                 //   this.calculation(i);

  //                 // });
  //               }
  //               // Utils.hideLoader('.page-body');
  //             }
  //           } else {
  //             // Utils.hideLoader('.page-body');
  //           }
  //           this.docModel = null;
  //         }), (error: any) => {
  //           this.docModel = null;
  //           // Utils.hideLoader('.page-body');
  //           // Utils.notification(Constants.serverErrorText, 'error');
  //         };

  //     } else {
  //       console.log('File Not Good');
  //     }
  //   }
  // }

  appendFiles(file: any, name: any) {
    ;
    this.formData.append(name, file[0]);
    console.log(this.formData);
  }

  onSelectFile(event: any, fileTypeName: any) {
    //MultiFiles Selection and Upload

    // Utils.showLoader("#Form1");
    var fileName = [];
    var fileSelect: any;
    var url;
    for (let i = 0; i < event.target.files.length; i++) {
      // if (event.target.files && event.target.files[0]) {
      fileName = event.target.files[i].name;
      fileSelect = event.target.files[i];
      var maxFileSizeInBytes: any = 5 * 1024 * 1024;
      const reader = new FileReader();
      if (
        fileSelect.type === "application/pdf" ||
        fileSelect.type === "application/xlsx" ||
        (fileSelect.type === "application/vnd.ms-excel" &&
          fileSelect.size <= maxFileSizeInBytes)
      ) {
        reader.readAsDataURL(event.target.files[i]); // read file as data url
        reader.onload = (events: any) => {
          // called once readAsDataURL is completed
          url = events.target.result;
        };

        if ((fileTypeName = "chrCertificate")) {
          this.documentModel.character_certificate = event.target.files;
          this.appendFiles(event.target.files, "character_certificate");
        }
        if ((fileTypeName = "birthCertificate")) {
          // this.documentModel.birth_certificate = event.target.files
          this.appendFiles(event.target.files, "birth_certificate");
        }
        if ((fileTypeName = "beForm")) {
          // this.documentModel.b_form = event.target.files
          this.appendFiles(event.target.files, "b_form");
        }
        if ((fileTypeName = "result")) {
          // this.documentModel.previous_school_result_card = event.target.files
          this.appendFiles(event.target.files, "previous_school_result_card");
        }
        this.formData.append("student_id", "2");
        this.documentModel.student_id = 2;
      } else {
        // Utils.notification(Constants.Only_pdf_or_zip_file_are_allowed_to_upload, 'error');

        setTimeout(() => {
          location.reload();
        }, 1500);
        return;
      }
    }
    // var arrayFile = event.target.files;
    // var fileNameDisplay = event.target.files[0].name;
    // Utils.hideLoader("#Form1");
  }

  updateStudent() {
    const body = {
      stuFirstName: "Hassan New",
      stuLastName: "",
      stuGender: "",
      stuDOB: "",
      stuReligion: "",
      //optionail fields
      stuBloodGroup: "",
      stuPlaceOfBirth: "",
      stuPhone: "",
      stuEmail: "",

      stuPreviousSchool: "",
      stuReasonOfChoosenSchool: "",
      stuReasonOfLeavingSchool: "",
      stuLanguageAtHome: "",

      stuBrotherSisterNumber: "",
      stuBroSisNameAttendSchool1: "",
      stuBroSisNameAttendSchool2: "",
      stuBroSisNameAttendSchool3: "",
      stuBroSisNameAttendClass1: "",
      stuBroSisNameAttendClass2: "",
      stuBroSisNameAttendClass3: "",
    };

    this.studentService.createStudent(body).subscribe((data: any) => {
      data;
      console.log("Hassan");
    });
    this.model = {};
    this.router.navigate(["/student"]);
  }

  createStudent(f: NgForm) {
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
      blood_group_id: this.model.bloodGroup.id.toString(),
      religion_id: this.model.religion.id.toString(),
      gender_id: this.model.gender.id.toString(),
      status: this.model.status ? "true" : "false",
      
    };

    setTimeout(() => {
      this.studentService.createStudent(body).subscribe((data: any) => {
        if (data && data.message == "Student successfully registered!") {
          this.router.navigate(["/student"]);
          this.toastr.success('Student create SuccessFully');
          this.ngxService.stop()

        } else if(data && data.message == 'Invalid data sent!'){
          this.toastr.error(data.message);  
          
        }
      });
    });
    this.model = {};
  }

  saveParent() {
    setTimeout(() => {
      this.parentModel.student_id = 2;
      this.studentService
        .updateParent(this.parentModel)
        .subscribe((data: any) => {
          console.log("JJJJJJJJ");
          data;
        });
    }, 5000);
  }

  isActive(event: any) {
    if (event.checked) {
      this.model.status = true;
    } else {
      this.model.status = false;
    }
  }

  saveReceiver() {
    setTimeout(() => {
      this.receiverModel.student_id = 2;
      this.studentService
        .updateReciver(this.receiverModel)
        .subscribe((data: any) => {
          console.log("JJJJJJJJ");
          data;
        });
    }, 5000);
  }

  downloadFile() {}

  onItemSelect(labelId: any, event: any) {}

  onItemDeSelect(labelId: any, selectId: any) {}

  onSelectAll(labelId: any) {}

  onDeSelectAll(labelId: any) {}
}
