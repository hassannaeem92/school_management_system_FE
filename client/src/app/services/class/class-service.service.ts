import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { GlobalApiCallService } from 'src/shared-resources/_services/global-api-call.service';
import { Page } from 'src/shared-resources/page';
import { PagedData } from 'src/shared-resources/paged-data';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService  {

  private createClassUrl = environment.nodeBaseUrl + 'class/createClass';
  private updateClassUrl = environment.nodeBaseUrl + 'class/updateClass';
  private getSectuonListUrl = environment.baseUrl + 'admin/student/store';
  private getTeacherListtUrl = environment.baseUrl + 'admin/student/store';
  private updateClassStudentUrl = environment.baseUrl + 'admin/student/store';
  
  private removeStudentFromSectionUrl = environment.baseUrl + 'admin/student/store';
  private getAllforGridUrl = environment.nodeBaseUrl + 'class/getAll';
  private getClassInfoUrl = environment.nodeBaseUrl + 'class/getById';
  private getAllSectionDropdownUrl = environment.nodeBaseUrl + 'section/getSectionDropdown';
  private getAllTeacherDropdownUrl = environment.nodeBaseUrl + 'teacher/getTeacherDropdown';
  private getRemaningSectionstudentUrl = environment.nodeBaseUrl + 'section/getAllUnAssigned';
  private getSectiontudentUrl = environment.nodeBaseUrl + 'section/getAllAssigned';
  private assignSectiontudentUrl = environment.nodeBaseUrl + 'section/studentAssign';
  private deleteSectionStudentUrl = environment.nodeBaseUrl + 'section/deleteStudent';
  private deleteClassUrl = environment.nodeBaseUrl + 'class/deleteClass';
  private teacherSectionUrl = environment.nodeBaseUrl + 'section/sectionAssign';
  private getSectionTeacherDataUrl = environment.nodeBaseUrl + 'section/getSectionTeacherData';



  constructor(private globalApiService: GlobalApiCallService) { }

  createClass(body: any) {  
     return this.globalApiService.postRequest(this.createClassUrl, body)
  }

 updateClass(body: any) {  
    return this.globalApiService.postRequest(this.updateClassUrl, body)
 }


  getSection() {  
    return this.globalApiService.postRequest(this.getAllSectionDropdownUrl, {})
  }
  
  getTeacher() {  
    return this.globalApiService.postRequest(this.getAllTeacherDropdownUrl, {})
  }

  getAll(page: Page, searchKeyword: any): Observable<PagedData<any>> {
    return this.globalApiService.postRequest(this.getAllforGridUrl, {
      'searchkeyWord': searchKeyword,
      'pageNumber': page.pageNumber + 1,
      'pageSize': page.size,
    }).pipe(map(data => this.getPagedData(page, data)));
  }
  
  private getPagedData(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.classes && data.classes.length) {
      var gridRecords = data.classes;
      
      page.totalElements = data.total;
      if (gridRecords && gridRecords.length > 0) {
        for (let i = 0; i < gridRecords.length; i++) {
          let jsonObj = gridRecords[i];
          let parentType = '';
          if (jsonObj?.parentValueId != null) {
            parentType = jsonObj?.parentType + ': ' + jsonObj?.parentValueId
          } else {
            parentType = jsonObj?.parentType
          }
          
          let obj = {
            // sNo: i + 1,
          id: jsonObj.class_id,
            idS: i + 1,
            name: jsonObj?.class_name
           

          };
          pagedData.data.push(obj);
        }
      }
    }
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    let end = Math.min((start + page.size), page.totalElements);
    pagedData.page = page;
    return pagedData;
  }

  getClassInfo(id: any) {
    return this.globalApiService.postRequest(this.getClassInfoUrl, {classId: id})
 
  }

  getSectionTeacherData(id: any) {
    return this.globalApiService.postRequest(this.getSectionTeacherDataUrl, {classId: id})
    
  }

  getRemainingSectionStudent(body: any) {
   
    return this.globalApiService.postRequest(this.getRemaningSectionstudentUrl, {
      'pageNumber': body.page.pageNumber + 1,
      'pageSize': body.page.size,
      'searchkeyWord': body.searchKeyword
    }).pipe(map(data => this.getPagedDataStudent(body.page, data)));
  }

  getSectionStudent(body: any) {

    return this.globalApiService.postRequest(this.getSectiontudentUrl, {
      
      'pageNumber': body.page.pageNumber + 1,
      'pageSize': body.page.size,
      'sectionId': body.sectionId,
      'classId': body.classId,
      'searchkeyWord': body.searchkeyword
    }).pipe(map(data => this.getPagedDataStudent(body.page, data)));

    // return this.globalApiService.postRequest(this.getSectiontudentUrl, body)
 
    }
  
  // getSectionStudent(body: any) {

  //   return this.globalApiService.postRequest(this.getSectiontudentUrl, body)
  // }

  private getPagedDataStudent(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.students && data.students.length) {
      var gridRecords = data.students;
      
      page.totalElements = data.total[0].total;
      if (gridRecords && gridRecords.length > 0) {
        for (let i = 0; i < gridRecords.length; i++) {
          let jsonObj = gridRecords[i]
          
          let obj = {
            // sNo: i + 1,
            id: jsonObj.id,
            idS: i + 1,
            name: jsonObj?.first_name + ' '+ jsonObj?.last_name
           
          };
          pagedData.data.push(obj);
        }
      }
    }
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    let end = Math.min((start + page.size), page.totalElements);
    pagedData.page = page;
    return pagedData;
  }

  private getPagedDataStudentRemaining(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.students.data && data.students.data.length) {
      var gridRecords = data.students.data;
      
      page.totalElements = data.count;
      if (gridRecords && gridRecords.length > 0) {
        for (let i = 0; i < gridRecords.length; i++) {
          let jsonObj = gridRecords[i]
          
          let obj = {
            // sNo: i + 1,
            id: jsonObj.id,
            idS: i + 1,
            name: jsonObj?.first_name + ' '+ jsonObj?.last_name
           
          };
          pagedData.data.push(obj);
        }
      }
    }
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    let end = Math.min((start + page.size), page.totalElements);
    pagedData.page = page;
    return pagedData;
  }
  
  deleteSectionStudent(body: any) {
    return this.globalApiService.postRequest(this.deleteSectionStudentUrl, body);
  }

  deleteClass(body: any) {
    return this.globalApiService.postRequest(this.deleteClassUrl, body);
  }



  assignSectionStudent(body: any) {
    return this.globalApiService.postRequest(this.assignSectiontudentUrl, body)
 
  }

  saveTeacherSection(body: any) {
    return this.globalApiService.postRequest(this.teacherSectionUrl, body)
 
  }


  

}
