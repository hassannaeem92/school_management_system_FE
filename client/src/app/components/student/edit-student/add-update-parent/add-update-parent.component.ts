import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import { StudentService } from 'src/app/services/student/student.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-add-update-parent',
  templateUrl: './add-update-parent.component.html',
  styleUrls: ['./add-update-parent.component.scss']
})
export class AddUpdateParentComponent {
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
    private ngxService: NgxUiLoaderService,
    private dropdownService: DropdownServiceService, private toastr: ToastrService,
    ) {
    
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
    this.ngxService.start()

    this.studentService.getStudentInfo(paramId).subscribe((fetchData: any) => {
      
      this.model.gender = {};

      if (fetchData.data && fetchData.data.student.parent) {
        var result = fetchData.data.student.parent;
        this.isCreate = false;
        this.model = result
         
      } else {
        
      }
      this.ngxService.stop()

    });     
 }
  updateParent(f: NgForm) {
    setTimeout(() => {
      
      const body = {
        
        student_id: this.paramId,
        father_name: this.model.father_name,
        father_number: this.model.father_number,
        father_occupation: this.model.father_occupation,
        home_number: this.model.home_number,
        mother_name: this.model.mother_name,
        mother_number: this.model.mother_number,
        mother_occupation: this.model.mother_occupation,
        address: this.model.address,
        postal_address: this.model.postal_address,
        email: this.model.email ? this.model.email : ''
      
      }

      const body1 = {
        
        id: this.paramId,
        father_name: this.model.father_name,
        father_number: this.model.father_number,
        father_occupation: this.model.father_occupation,
        home_number: this.model.home_number,
        mother_name: this.model.mother_name,
        mother_number: this.model.mother_number,
        mother_occupation: this.model.mother_occupation,
        address: this.model.address,
        postal_address: this.model.postal_address,
        email: this.model.email ? this.model.email : ''
        
      
      }

        var requestBody: any; 
        var url: any;
        if (this.isCreate) {
          requestBody = body
          var url: any = this.studentService.createParent(requestBody)
        } else {
          requestBody = body1
          url = this.studentService.updateParent(requestBody)
        }

     
        url.subscribe((data: any) => {
          if (data && data.message == "Student`s parent successfully stored!" || data && data.message == "Student`s parent updated successfully!") {
            this.router.navigate(["/student"]);

            this.toastr.success(data.message);

          }
         
        });
    }, 1000);
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
