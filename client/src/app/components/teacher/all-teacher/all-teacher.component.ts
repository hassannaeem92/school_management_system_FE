import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StudentService } from 'src/app/services/student/student.service';

import { Page } from 'src/shared-resources/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Utils } from 'src/shared-resources/shared-components/shared-componets/utils';
import * as Noty from 'noty';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-all-teacher',
  templateUrl: './all-teacher.component.html',
  styleUrls: ['./all-teacher.component.scss']
})
export class AllTeacherComponent implements OnInit{

  ngOnInit(): void {
    this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
    
  }

    

  constructor(private router: Router, private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute, private studentService: StudentService,
    private teacherService: TeacherService
  ) {
      
  }

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  @ViewChild('search', { static: false }) search: any;
  subscription: any;
  temp: any = [];
  messages: any = 'Not Found';
  selected: any = [];
  model: any = {}
  loadingIndicator = true;
  reorderable = true;
  page = new Page();
  searchKeyword: any = '';
  rows: any = [ 
  ];

  
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

    this.page.searchKeyword = '';

    this.subscription = this.teacherService.getAll(this.page, this.searchKeyword).subscribe(pagedData => {
      
      if (pagedData) {
        this.page.totalElements = this.page.totalElements;
         
        this.rows = pagedData.data;
      }
    this.ngxService.stop()
     
    });
    this.subscription.add(() => Utils.hideLoader('#Form1'));
    // this.ngxService.stop()
  }

  updateFilter(event: any) {
    this.searchKeyword = event.target.value.toLowerCase();
    this.page.pageNumber = 0;
    // this.setPage({ offset: 0 });
    setTimeout(() => {
      this.setPage({ offset: 0 });
    }, 2000);
  }

  edit(event: any) {
    // if (event && event.cellIndex !== 0) {
    //   if (event.type === 'click' && event.row) {
    //   }
    // }
    if (event && event.cellIndex !== 0) {
      if (event.type === 'click' && event.type != 'checked') {
      this.router.navigate(['edit', event.row.id], { relativeTo: this.route });

      }
    }

  }
  onSelect(selected: any) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  changePageSize(event: any) {
    
    this.page.size = event;
    this.setPage({ offset: 0});
  }

}
