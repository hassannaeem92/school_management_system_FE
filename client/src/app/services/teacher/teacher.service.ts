import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalApiCallService } from 'src/shared-resources/_services/global-api-call.service';
import * as moment from 'moment';
import { PagedData } from 'src/shared-resources/paged-data';
import { Page } from 'src/shared-resources/page';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private createTeacherUrl = environment.baseUrl + 'admin/teacher/store';
  private updateTeacherUrl = environment.baseUrl + 'admin/teacher/update';
  private getAllforGridUrl = environment.baseUrl + 'admin/teacher/get-all';
  private getTeacherUrl = environment.baseUrl + 'admin/teacher/get';
  private createTeacherImageUrl = environment.baseUrl + 'admin/teacher/update-profile-photo';
  private deleteDocumentUrl = environment.baseUrl + 'admin/teacher/document/remove';
  private createDocumentUrl = environment.baseUrl + 'admin/teacher/document/store';
  private updateDocumentUrl = environment.baseUrl + 'admin/teacher/document/update';
  

  constructor(private globalApiService: GlobalApiCallService) { }

  createTeacher(body: any) {
    
    return this.globalApiService.postRequest(this.createTeacherUrl, body)
  }

  updateTeacher(body: any) {
    
    return this.globalApiService.patchRequest(this.updateTeacherUrl, body)
  }

  updateTeacherImage(body: any) {
    
    return this.globalApiService.postRequest(this.createTeacherImageUrl, body)
  }

  getTeacher(id: any) {
    return this.globalApiService.postRequest(this.getTeacherUrl, {id: id})
  }
  
  createDocument(body: any) {
  
    return this.globalApiService.postRequest(this.createDocumentUrl, body);
  }

  deleteDocument(body: any) {
  
    return this.globalApiService.postRequest(this.deleteDocumentUrl, body);
  }

  updateDocument(body: any) {
  
    return this.globalApiService.postRequest(this.updateDocumentUrl, body);
  }

  getAll(page: Page, searchKeyword: any): Observable<PagedData<any>> {
    return this.globalApiService.postRequest(this.getAllforGridUrl, {
      'first_name': searchKeyword,
      'page_number': page.pageNumber + 1,
      'page_size': page.size,
    }).pipe(map(data => this.getPagedData(page, data.data)));
  }
  
  private getPagedData(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.teacher.data && data.teacher.data.length) {
      var gridRecords = data.teacher.data;
      
      page.totalElements = data.count;
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
          id: jsonObj.id,
            idS: i + 1,
            name: jsonObj?.first_name + ' '+ jsonObj?.last_name,
            gender: jsonObj?.gender ? jsonObj?.gender.gender: '',
            phoneNumber: jsonObj?.phone_number ? jsonObj?.phone_number : '',
            religion: jsonObj?.religion ? jsonObj?.religion.religion : '',
            registerDate: jsonObj?.created_at ? moment(jsonObj?.created_at).format("DD-MM-YYYY") : '',
            dateOfBirth: jsonObj?.date_of_birth ? moment(jsonObj?.date_of_birth).format("DD-MM-YYYY") : '',
            status: jsonObj?.status ? jsonObj?.status : '',
            

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

}
