import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';




@Component({
  selector: 'app-add-update-receiver',
  templateUrl: './add-update-receiver.component.html',
  styleUrls: ['./add-update-receiver.component.scss']
})
export class AddUpdateReceiverComponent {
  
  minDate: any;
  bloodGroupArray: any = [];

  genderArray: any = [];
  religionArray: any = [];
  relationArray: any = [];

  requiredField: string = "Field is required"
  paramId: any;
  model: any = {}
  isCreate: any = true;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute, private studentService: StudentService,
    private dropdownService: DropdownServiceService,
    private toastr: ToastrService,

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
    this.getReceiverRelation()



  }

  getById(paramId: any) {
    this.ngxService.start()

    this.studentService.getStudentInfo(paramId).subscribe((fetchData: any) => {
      
      this.model.gender = {};

      if (fetchData.data && fetchData.data.student.receiver) {
        var result = fetchData.data.student.receiver;
        this.model = result
        this.isCreate = false;
        // this.model.relation_id = result.relation
        
        this.model.relationId = this.relationArray.find((x: any) => x.id ==  result.relation.id);

      } else {
        
      }
    this.ngxService.stop()

    });     
 }

  create(f: NgForm) {
    this.ngxService.start()

      if (!this.model.relationId) {
        this.toastr.error('Please fill the Complete Form');
        return
      }
      const body = {
        student_id: this.paramId,
        relation_id: this.model.relationId.id.toString(),
        cnic: this.model.cnic,
        mobile_number: this.model.mobile_number,
        name : this.model.name
      }
    
      const body1 = {
        id: this.paramId,
        relation_id: this.model.relationId.id.toString(),
        cnic: this.model.cnic,
        mobile_number: this.model.mobile_number,
        name : this.model.name
      }
       var requestBody: any;
      if (this.isCreate) {
        requestBody = body
        var url: any = this.studentService.createReciver(requestBody)
      } else {
        requestBody = body1
        url = this.studentService.updateReciver(requestBody)
      }
      
        url.subscribe((data: any) => {
          if (data && data.message == "Student`s receiver successfully stored!" || data && data.message == "Student`s receiver updated successfully!") {
            this.router.navigate(["/student"]);
            this.toastr.success(data.message);
          }
          this.ngxService.stop()

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

  getReceiverRelation() {
    this.studentService.getRelationArray().subscribe(data => {
      if (data && data.data.receiver_relations && data.data.receiver_relations.length) {
        var groups = data.data.receiver_relations;
        this.relationArray = groups.map((x: any) => {
          return {
            id: x.id, 
            name: x.relation
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
