import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent {

  minDate: any;
  bloodGroupArray: any = [];

  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required"
  paramId: any;
  model: any = {}
  getImage: any;
  lessDate: any;
  maxDate: any;
  

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute, private studentService: StudentService,
    private dropdownService: DropdownServiceService, private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
    ) {
    
  }
  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.lessDate = moment('2000-01-01');

    this.ngxService.start()
    this.getBloodGroups();
    this.getReligions();
    this.getGender();

    setTimeout(() => {
      this.route.params.subscribe((paramsId: any) => {
        if (paramsId && paramsId.id) {
          this.paramId = paramsId.id
          this.getById(this.paramId);
          
        }
      });
    }, 1000);

   

  

  }

  getById(paramId: any) {
    

     this.studentService.getStudentInfo(paramId).subscribe((fetchData: any) => {
       this.model.gender = {};

       if (fetchData.data && fetchData.data.student) {
         var result = fetchData.data.student;

          if (fetchData.data && fetchData.data.student.profile_photo) {
            this.getImage = fetchData.data.student.profile_photo;            
          }


          this.model.firstName = result.first_name,
          this.model.lastName = result.last_name
            this.model.placeOfBirth = result.place_of_birth
            this.model.phone = result.phone_number
            this.model.email = result.email
            this.model.dateOfBirth = result.date_of_birth
            this.model.registrationDate = result.registration_date
         
            this.model.status = result.status == 'Active' ? true : false;
            this.model.religion = this.religionArray.find((x: any) => x.id ==  result.religion_id);
            this.model.gender =  this.genderArray.find((x: any) => x.id ==  result.gender_id); 
            this.model.bloodGroup = this.bloodGroupArray.find((x: any) => x.id ==  result.blood_group_id);
            this.model.registrationNumber = result.registration_number;
       }
       this.ngxService.stop()

     });     
  }

  updateStudent(f: NgForm) {
  this.ngxService.start()

    const body = {
      id: this.paramId,
      first_name: this.model.firstName,
      last_name: this.model.lastName,
      date_of_birth: moment(this.model.dateOfBirth).format('YYYY-MM-DD'),
      registration_date: moment(this.model.registrationDate).format("YYYY-MM-DD"),
      place_of_birth: this.model.placeOfBirth,
      phone_number: this.model.phone,
      //optionail fields
      email: this.model.email ? this.model.email : '',
      blood_group_id: (this.model.bloodGroup.id).toString(),
      religion_id: (this.model.religion.id).toString(),
      gender_id: (this.model.gender.id).toString(),
      status: this.model.status ? "true" : "false",
      
    }


    setTimeout(() => {
      this.studentService.updateStudent(body).subscribe((data: any) => {
        if (data && data.message == 'Student updated successfully!') {
        
          this.toastr.success('Update SuccessFully');
          this.router.navigate(['/student']);
        } else {
          this.toastr.error('Email is Already Taken');
          
        }
      })
     });
    this.model = {};
    
  }

  getGender() {
    this.studentService.getGenderArray().subscribe(data => {
      if (data && data.data.genders && data.data.genders.length) {
        var groups = data.data.genders;
        this.genderArray = groups.map((x: any) => {
          return {
            id: x.id, 
            name: x.gender
          }
        })
      } else {
        
      }
    })
  }
  getBloodGroups() {
    
  this.studentService.getBloodGroupsArray().subscribe(data => {
   if (data && data.data.blood_groups && data.data.blood_groups.length) {
     var groups = data.data.blood_groups;
     this.bloodGroupArray = groups.map((x: any) => {
       return {
         id: x.id, 
         name: x.blood_group
       }
     })
   } else {
     
   }
   
 })
  }
  
  getReligions() {
    
    this.studentService.getReligionArray().subscribe(data => {
      if (data && data.data.religions && data.data.religions.length) {
        var groups = data.data.religions;
        this.religionArray = groups.map((x: any) => {
          return {
            id: x.id, 
            name: x.religion
          }
        })
      } else {
        
      }
    })
  }

  onlyDecimalNumberKey(event: any) {
    return this.commonService.onlyDecimalNumberKey(event);
  }

  isActive(event: any) {
    debugger
    if (event.checked) {
      this.model.status = true;
    } else {
      this.model.status = false;
    }
  }

  getFingerprint() {
    this.studentService.captureFingerprint().subscribe(
      data => {
        console.log("Fingerprint Captured:", data);
        debugger
      },
      error => {
        console.error("Error capturing fingerprint:", error);
      }
    );
  }

  clearForm(name: any, form: any) {
    this.model = {};
    form.form.markAsPristine();
    form.form.markAsUntouched();

  }

}
