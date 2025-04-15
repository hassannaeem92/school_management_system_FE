import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClassServiceService } from 'src/app/services/class/class-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-section-info',
  templateUrl: './section-info.component.html',
  styleUrls: ['./section-info.component.scss']
})
export class SectionInfoComponent implements OnInit {

  teacherArray: any = [];
  teacherArrayTemp: any = [];
  sectionArray: any = [];
  sectionArrayTemp: any = [];
  sectionList: any = [];
  teacherList: any = [];
  mode: any = 'add';
  deleteTeacherSectionList: any = [];

  model: any = {};
  minDate: any;
  maxDate: any;
  paramsId: any
  activityType: any = "home";
  docModel: any = {};
  dynamicArray: any = [];
  
  ngOnInit(): void {

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramsId = paramsId.id
        this.mode = 'edit'
      }
    })

    this.model.dynamicArray = [];
    this.model.firstName = 'Ten';
    this.model.lastName = 'Ali';
    this.getSectionsList();
    this.getTeacherList();
    this.getById()
    if (this.mode == 'add') {
      this.addRow();
    }
  }

  constructor(
    private toastr: ToastrService,
    private classService: ClassServiceService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute
    ) {}



  update(f: NgForm) {
    this.ngxService.start()
    // this.model.dynamicArray.map((x: any) => {
    //   if ((x.activeSection.name == "" || x.activeSection.id == "") || (x.activeTeacher.name == "" || x.activeTeacher.id == "")) {
    //     this.toastr.error("Please select all fields")
    //     return 
    //   }
    // });
    
    for (let x of this.model.dynamicArray) {
      if ((x.activeSection.name === "" || x.activeSection.id === "") || (x.activeTeacher.name === "" || x.activeTeacher.id === "")) {
        this.toastr.error("Please select all fields");
        this.ngxService.stop(); // Stop the service if there is an error
        return; // Exit the method
      }
    }

    var arr = this.model.dynamicArray.map((x: any) => {
      return {
        teacherId: x.activeTeacher.id,
        sectionId: x.activeSection.id,
        ctsId: x.ctsId ? x.ctsId : null,
        classId: this.paramsId
      }
    })

    const body = {
      teacherSectionlist: arr && arr.length ? arr : null,
      deleteList: this.deleteTeacherSectionList
    }
    
     
    
    this.classService.saveTeacherSection(body).subscribe((data: any) => {
      if (data.success.status == 200) {
        
        this.toastr.success('Updated successfully');
       
        this.ngxService.stop()
      } else {
        this.ngxService.stop()
        this.toastr.error('Failled to update');
      }
    });
  }

  getById() {
    this.ngxService.start()
    this.classService.getSectionTeacherData(this.paramsId).subscribe((data: any) => {
      
      var groups = data.teacherSectionData;
      if ( groups && groups.length) {
        
        groups.forEach((x: any) => {
          
          var nam = x.first_name + " " + x.last_name
          this.model.dynamicArray.push({activeSection: {id: x.section_id, name: x.section_name}, activeTeacher: {id: x.teacher_id, name: nam}, ctsId: x.cts_id ? x.cts_id : null});
          
          if (this.model.dynamicArray && this.model.dynamicArray.length) {
            this.model.dynamicArray.forEach((x: any) => {
              this.sectionArray = this.sectionArray.filter((section: any) => section.id !== x.activeSection.id);
              this.teacherArray = this.teacherArray.filter((teacher: any) => teacher.id !== x.activeTeacher.id);
            });
            
          }
          
        });
      } else {
        this.addRow();
      }
          this.ngxService.stop()
    })
  }

  addRow(index?: any) {
    
    if (this.model.dynamicArray && this.model.dynamicArray.length) {
      if ((index && index > -1) &&  (this.model.dynamicArray[index].activeSection.name == '' || this.model.dynamicArray[index].activeSection.id == '') || (this.model.dynamicArray[index].activeTeacher.name == '' || this.model.dynamicArray[index].activeTeacher.id == '')) {
        // Utils.notification('Please fill the Form', 'error')
        this.toastr.error('Please Fill the Form');
      } else {
        this.model.dynamicArray.push({activeSection: {id: '', name: ''}, activeTeacher: {id: '', name: ''}});
        
      }
      
    } else {
      this.model.dynamicArray.push({activeSection: {id: '', name: ''}, activeTeacher: {id: '', name: ''}});
      
    }

  }

  // sectionChange(event: any) {
  //   
  //   const selectedSection = event.id; 

    
  //   if (selectedSection) {
      
  //     const index = this.sectionArray.findIndex((section: any) => section.id === selectedSection);
  
      
  //     if (index !== -1) {
  //       this.sectionArray.splice(index, 1);
  //     }
  //   } else { 
     
  //     this.sectionArray.push(this.model.sectionList);
  //   }
  // }
  
  sectionChange(event: any, row: any) {
    // Remove selected section from sectionArray
    
    this.model.dynamicArray
    this.sectionArray = JSON.parse(JSON.stringify(this.sectionArrayTemp));

    if (this.model.dynamicArray && this.model.dynamicArray.length) {
      this.model.dynamicArray.forEach((x: any) => {
        this.sectionArray = this.sectionArray.filter((section: any) => section.id !== x.activeSection.id);
      });
    }

    if (row.activeSection) {
      this.sectionArray = this.sectionArray.filter((section: any) => section.id !== event.id);
    } else {
      this.sectionArray.push(event);
    }
    
  }
  


  removeRow(index: any, event: any) {
    this.model.dynamicArray.splice(index, 1);
    this.sectionArray.push(event.activeSection);
    this.sectionArray.push(event.activeTeacher);

    if (event.ctsId && event.ctsId !== null) {
      this.deleteTeacherSectionList.push(event.ctsId);
    }

  }

  assignTeacher(event: any, row: any) {
    this.teacherArray = JSON.parse(JSON.stringify(this.teacherArrayTemp));
    if (this.model.dynamicArray && this.model.dynamicArray.length) {
      this.model.dynamicArray.forEach((x: any) => {
        this.teacherArray = this.teacherArray.filter((teacher: any) => teacher.id !== x.activeTeacher.id);
      });
    }

    if (row.activeTeacher) {
      this.teacherArray = this.teacherArray.filter((teacher: any) => teacher.id !== event.id);
    } else {
      this.teacherArray.push(event);
    }
  }

  getSectionsList() {
    
    this.classService.getSection().subscribe((data: any) => {
      if (data.status == 200) {
        if (data && data.result && data.result.records && data.result.records.length) {
          var groups = data.result.records;
          this.sectionArray = groups.map((x: any) => {
            return {
              id: x.section_id,
              name: x.section_name,
            };
          });

          this.sectionArrayTemp = JSON.parse(JSON.stringify(this.sectionArray));

        } else {
        }
      }
    });
  }

  getTeacherList() {
    this.classService.getTeacher().subscribe((data: any) => {
      
      if (data.status == 200) {
        if (data && data.result && data.result && data.result.records && data.result.records.length) {
          var groups = data.result.records
          this.teacherArray = groups.map((x: any) => {
            return {
              id: x.id,
              name: x.first_name + ' ' + x.last_name,
            };
          });

          this.teacherArrayTemp = JSON.parse(JSON.stringify(this.teacherArray));

        } else {
        }
      }
    });
  }

  addSection(event: any) {
    
  }


}
