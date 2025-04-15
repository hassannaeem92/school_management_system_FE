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
  selector: 'app-add-update-guardian',
  templateUrl: './add-update-guardian.component.html',
  styleUrls: ['./add-update-guardian.component.scss']
})
export class AddUpdateGuardianComponent {
  
  minDate: any;
  bloodGroupArray: any = [];

  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required"
  paramId: any;
  model: any = {}
  isCreate: any = true;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute, private studentService: StudentService,
    private dropdownService: DropdownServiceService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {
    
  }
  ngOnInit(): void {
    this.minDate = new Date();

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramId = paramsId.id
        this.getById(paramsId.id);
        
      }
      
    });

    this.getBloodGroups();
    this.getReligions();
    this.getGender();



  }

  getById(paramId: any) {
    this.ngxService.start()

    this.studentService.getStudentInfo(paramId).subscribe((fetchData: any) => {
      
      this.model.gender = {};

      if (fetchData.data && fetchData.data.student.guardian) {
        var result = fetchData.data.student.guardian;
        this.isCreate = false
        
        this.model = result
      } else {
        
      }
      this.ngxService.stop()

    });     
 }

  create(f: NgForm) {
    
    const body = {
      student_id: this.paramId,
      name: this.model.name,
      mobile_number: this.model.mobile_number,
      occupation: this.model.home_number,
      home_number: this.model.home_number,
      address: this.model.address,
      //optionail fields
      postal_address: this.model.postal_address,
      email: this.model.email ? this.model.email : ''
     
    }
    const body1 = {
      id: this.paramId,
      name: this.model.name,
      mobile_number: this.model.mobile_number,
      occupation: this.model.home_number,
      home_number: this.model.home_number,
      address: this.model.address,
      //optionail fields
      postal_address: this.model.postal_address,
      email: this.model.email ? this.model.email : ''
      
     
    }
    var requestBody: any; 
    var url: any;
    if (this.isCreate) {
      requestBody = body
      var url: any = this.studentService.createGuardian(requestBody)
    } else {
      requestBody = body1
      url = this.studentService.updateGuardian(requestBody)
    }

    setTimeout(() => {
      url.subscribe((data: any) => {
        
        if(data && data.message == 'Student`s guardian successfully stored!' || data.message == 'Student`s guardian updated successfully!')
        this.toastr.success(data.message);
        this.router.navigate(['/student']);
        
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

  clearForm(name: any) {
    this.model = {};

  }
}
