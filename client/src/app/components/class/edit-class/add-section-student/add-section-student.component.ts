import { Component, OnInit } from '@angular/core';
import { Page } from 'src/shared-resources/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Utils } from 'src/shared-resources/shared-components/shared-componets/utils';
import * as Noty from 'noty';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute, Router } from '@angular/router';
import { ClassServiceService } from 'src/app/services/class/class-service.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;


@Component({
  selector: 'app-add-section-student',
  templateUrl: './add-section-student.component.html',
  styleUrls: ['./add-section-student.component.scss']
})
export class AddSectionStudentComponent implements OnInit {
  
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  // @ViewChild('search', { static: false }) search: any;
  subscription: any;
  temp: any = [];
  messages: any = 'Not Found';
  selected: any = [];
  selectedStudent: any = [];
  model: any = {}
  loadingIndicator = true;
  reorderable = true;
  page = new Page();
  page2 = new Page();
  totalAss: any
  searchKeyword: any = '';
  searchKeyword2: any = '';
  sectionArray: any = [];
  teacherArray: any = [];
  paramId: any;
  studentsRemArray: any = [];
  rows: any = [];
  
  
  minDate: any;
  maxDate: any;

  mode: any;
  activityType: any = "home";
  docModel: any = {};

  constructor(private classService: ClassServiceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService

  ) {
    
  }


  ngOnInit(): void {
    this.model.firstName = 'Ten';
    this.model.lastName = 'Ali';
    this.getSectionsList();
    this.getTeacherList();

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramId = paramsId.id
        // this.getById(paramsId.id); 
      }
    });

  }

  updateFilter(event: any) {

    setTimeout(() => {
      this.searchKeyword = event.target.value.toLowerCase();
      this.page.pageNumber = 0;
      this.setPage({ offset: 0 });
      
    }, 1000);

  }

  updateFilterModal(event: any) {

    setTimeout(() => {
      this.searchKeyword2 = event.target.value.toLowerCase();
      this.page2.pageNumber = 0;
      this.setPageAssignStudent({ offset: 0 });
      
    }, 1000);

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

          // this.sectionArrayTemp = JSON.parse(JSON.stringify(this.sectionArray));

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

          // this.teacherArrayTemp = JSON.parse(JSON.stringify(this.teacherArray));

        } else {
        }
      }
    });
  }

  sectionChange(event: any) {
    // Remove selected section from sectionArray
    
    if (event) {
        this.setPage({ offset: 0 });
    }
    
  }

  setPage1(pageInfo?: any) {
    this.ngxService.start()
    
    this.selected = [];
    this.rows = [];
    this.page.pageNumber = pageInfo.offset;
    this.page.totalElements = 0;
  
    if (pageInfo.sortOn == undefined) {
      this.page.sortOn = this.page.sortOn;
    } else {
      this.page.sortOn = pageInfo.sortOn;
    }
    if (pageInfo.sortBy == undefined) {
      this.page.sortBy = this.page.sortBy;
    } else {
      this.page.sortBy = pageInfo.sortBy;
    }

    this.page.searchKeyword = this.searchKeyword;

    
    const selectedValue = this.model.sectionList ? this.model.sectionList.id : null;
    const body = {
      classId: Number(this.paramId),
      sectionId: this.model.sectionList.id,
      page: this.page,
      
    }
    
      this.classService.getSectionStudent(body).subscribe((pageData: any) => {
        
        var data = pageData.data
        if (data && data.length) {
         setTimeout(() => {
           this.page.totalElements = this.page.totalElements;
          this.rows = data;
          
         }, 1000);
          
         
        }
        this.ngxService.stop()
        
      })
   

  }

  setPage(pageInfo: any) {
    
    // this.selected = [];
    this.ngxService.start()
    
    this.selected = [];
    this.page.pageNumber = pageInfo.offset;
    if (pageInfo.sortOn == undefined) {
      this.page.sortOn = this.page.sortOn;
    } else {
      this.page.sortOn = pageInfo.sortOn;
    }
    if (pageInfo.sortBy == undefined) {
      this.page.sortBy = this.page.sortBy;
    } else {
      this.page.sortBy = pageInfo.sortBy;
    }

    this.page.searchKeyword = this.searchKeyword;

     const body = {
      classId: Number(this.paramId),
      sectionId: this.model.sectionList.id,
      searchkeyword: this.searchKeyword,
      page: this.page,
      
    }
    
      this.classService.getSectionStudent(body).subscribe((pageData: any) => {
        
        var data = pageData.data
        if (data && data.length) {
         setTimeout(() => {
           this.page.totalElements = this.page.totalElements;
          this.rows = data;
          
         }, 1000);
         
        } else {
          this.page.totalElements = this.page.totalElements;
          this.rows = [];
        }
        this.ngxService.stop();
        
      })
   
    this.ngxService.stop()
  }


  setPageAssignStudent( pageInfo?: any) {
    this.ngxService.start()
    this.studentsRemArray = [];
    this.selectedStudent = [];
    this.page2.pageNumber = pageInfo.offset;
    if (pageInfo.sortOn == undefined) {
      this.page2.sortOn = this.page2.sortOn;
    } else {
      this.page2.sortOn = pageInfo.sortOn;
    }
    if (pageInfo.sortBy == undefined) {
      this.page2.sortBy = this.page2.sortBy;
    } else {
      this.page2.sortBy = pageInfo.sortBy;
    }

    this.page2.searchKeyword = '';

    
    // const selectedValue = event.id
    const body = {
      
      page: this.page2,
      searchKeyword: this.searchKeyword2
    }
    
    this.classService.getRemainingSectionStudent(body).subscribe((pageData: any) => {
      var data = pageData.data
      if (data && data.length) {
       
        
        
      
          // this.page = data.page
        //  this.totalAss = data.total;
        
        setTimeout(() => {
          this.page2.totalElements = this.page2.totalElements;
          this.studentsRemArray = data;
          
        }, 500)
          
         
        
      this.ngxService.stop()
        
        
      }
      $('#assignStudent').modal('show');
    })
    this.ngxService.stop()
    

  }

  edit(event: any) {
    
  }

  onSelect({ selected }: any) {
    
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onSelectStudent({ selected }: any) {
    
    this.selectedStudent.splice(0, this.selectedStudent.length);
    this.selectedStudent.push(...selected);
  }
  




  assignStudentModal() {
    this.selectedStudent = [];
    this.setPageAssignStudent({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });


    // this.selectedStudent = [];
    // const body = {
    //   class_id: Number(this.paramId),
    //   teacher_id: this.model.teacherList.id,
    //   section_id: this.model.sectionList.id
    // }

    // this.classService.getRemainingSectionStudent(body).subscribe((data: any) => {
    //   if (data && data.data.status == 200) {
    //     if (data.data.students && data.data.students.length) {
    //       this.studentsRemArray = data.data.students;
    //       $('#assignStudent').modal('show');
    //     }
    //   }
    //   
    // })
  }

  assignSectionStudent() {

    var list = []
    list = this.selectedStudent.map((x: any) => {
      return x.id;
    })

    const body = {
      classId: Number(this.paramId),
      // teacher_id: this.model.teacherList.id,
      sectionId: this.model.sectionList.id,
      studentIds: list && list.length ? list : null

    }

    this.classService.assignSectionStudent(body).subscribe((data: any) => {
      
      if (data && data.status == 200) {
       
          
          $('#assignStudent').modal('hide');
          this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
          this.toastr.success('Added Successfully');
      } else {
        $('#assignStudent').modal('hide');
        this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
        this.toastr.success('Failled to Add');
        
      }
      
    })
  }

  toDelete() {
    if (this.selected.length > 0) {
      this.selected = this.selected.map((x: any) => {
        return (x.id)
      });

      const body = {
        studentIds: this.selected,
        sectionId: this.model.sectionList.id,
        classId: Number(this.paramId)
      }

      this.classService.deleteSectionStudent(body).subscribe(data => {

        this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
        $('#confirmation-modal').modal('hide');
        if (data.code == 200 || data.code == 201) {
          // Utils.notification(data.btiMessage.message, 'success');
        } else {
          // Utils.notification(data.btiMessage.message, 'error');
        }
      })
    }
  }


  onSectionSelect(event: any) {
    this.setPage({offset: 0});
  }

 

  changePageSize(event: any, checkModal?: any) {
    
      this.page.size = event;
      this.setPage({ offset: 0});
    
  }

}
