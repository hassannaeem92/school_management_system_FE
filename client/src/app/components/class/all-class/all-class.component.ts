import { Component, ViewChild, OnInit } from '@angular/core';
import { Page } from 'src/shared-resources/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Utils } from 'src/shared-resources/shared-components/shared-componets/utils';
import * as Noty from 'noty';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { ClassServiceService } from 'src/app/services/class/class-service.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;

@Component({
  selector: 'app-all-class',
  templateUrl: './all-class.component.html',
  styleUrls: ['./all-class.component.scss']
})


  
export class AllClassComponent implements OnInit {
  
  ngOnInit(): void {
    this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
  }

    

  constructor(private router: Router, private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute, private classService: ClassServiceService, private toastr: ToastrService,
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
  rows: any = [];

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

    this.subscription = this.classService.getAll(this.page, this.searchKeyword).subscribe(pagedData => {
      
      if (pagedData) {
        this.page.totalElements = this.page.totalElements;
         
        this.rows = pagedData.data;
        }
    this.ngxService.stop()
     
    });
   
    this.ngxService.stop()
  }

  updateFilter(event: any) {

    setTimeout(() => {
      this.searchKeyword = event.target.value.toLowerCase();
      this.page.pageNumber = 0;
      this.setPage({ offset: 0 });
      
    }, 1200);

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
  onSelect({ selected }: any) {
    
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  changePageSize(event: any) {
    
    this.page.size = event;
    this.setPage({ offset: 0});
  }

  toDelete() {
    if (this.selected.length > 0) {
      var selectedId = this.selected.map((x: any) => {
        return x.id
      });

      const body = {
        'classIds': selectedId
      }

      this.classService.deleteClass(body).subscribe(data => {

        this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
        $('#confirmation-modal').modal('hide');
        if (data.code == 200 || data.code == 201) {
          // Utils.notification(data.btiMessage.message, 'success');
          this.toastr.success('Delete SuccessFully');
        } else {
          // Utils.notification(data.btiMessage.message, 'error');
          this.toastr.error('Falled');

        }
      })
    }
  }

}

