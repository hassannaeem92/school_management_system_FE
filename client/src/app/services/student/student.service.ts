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
export class StudentService {
  private createStudentUrl = environment.baseUrl + 'admin/student/store';
  private updateStudentUrl = environment.baseUrl + 'admin/student/update';
  private updatePaentUrl = environment.baseUrl + 'admin/student/parent/update';
  private updateReceivertUrl = environment.baseUrl + 'admin/student/receiver/update';
  private createDocumentUrl = environment.baseUrl + 'admin/student/document/store';
  private updateDocumentUrl = environment.baseUrl + 'admin/student/document/update';
  
  private getBloodgroupUrl = environment.baseUrl + 'admin/misc/get/blood-groups';
  private getReligionUrl = environment.baseUrl + 'admin/misc/get/religions';
  private getGenderUrl = environment.baseUrl + 'admin/misc/get/genders';
  private getAllforGridUrl = environment.baseUrl + 'admin/student/get-all';
  private getRelationUrl = environment.baseUrl + 'admin/misc/get/receiver-relations';
  private updateGuardainUrl = environment.baseUrl + 'admin/student/guardian/update';
  private createGuardainUrl = environment.baseUrl + 'admin/student/guardian/store';
  private createReceivertUrl = environment.baseUrl + 'admin/student/receiver/store';
  private createStudentFeeUrl = environment.nodeBaseUrl + 'student/createStudentFee';
  private createPaentUrl = environment.baseUrl + 'admin/student/parent/store';
  private StudentImageUrl = environment.baseUrl + 'admin/student/update-profile-photo';

  private getStudentInfoUrl = environment.baseUrl + 'admin/student/get';
  private getAmountByIdUrl = environment.nodeBaseUrl + 'student/getAmountById';
  private deleteDocumentUrl = environment.baseUrl + 'admin/student/document/remove';
  private fingerPrintUrl = 'http://localhost:8000/capture'; 

  constructor(private globalApiService: GlobalApiCallService,) { }

  createStudent(body: any) {
    
     return this.globalApiService.postRequest(this.createStudentUrl, body)
  }


  captureFingerprint() {
    return this.globalApiService.getRequest(this.fingerPrintUrl)
  }

  updateImage(body: any) {
    
    return this.globalApiService.postRequest(this.StudentImageUrl, body)
    
  }

  updateStudent(body: any) {
    
     return this.globalApiService.patchRequest(this.updateStudentUrl, body)
  }
  

  updateGuardian(body: any) {
    return this.globalApiService.patchRequest(this.updateGuardainUrl, body)
  }
  
  createGuardian(body: any) {
    return this.globalApiService.postRequest(this.createGuardainUrl, body)
  }

  updateParent(body: any) {
    return this.globalApiService.patchRequest(this.updatePaentUrl, body)
    
  }

  createParent(body: any) {
    return this.globalApiService.postRequest(this.createPaentUrl, body)
    
  }

  updateReciver(body: any) {
    return this.globalApiService.patchRequest(this.updateReceivertUrl, body)
    
  }

  createReciver(body: any) {
    return this.globalApiService.postRequest(this.createReceivertUrl, body)
    
  }

  createStudentFee(body: any) {
    return this.globalApiService.postRequest(this.createStudentFeeUrl, body)
    
  }

  getAmountById(id: any) {
    return this.globalApiService.postRequest(this.getAmountByIdUrl, { 'studentId': id })
  }

  getBloodGroupsArray() {
    return this.globalApiService.postRequest(this.getBloodgroupUrl)
    
  }

  getReligionArray() {
    return this.globalApiService.postRequest(this.getReligionUrl)
    
  }

  getRelationArray() {
    return this.globalApiService.postRequest(this.getRelationUrl)
    
  }

  getGenderArray() {
    return this.globalApiService.postRequest(this.getGenderUrl)
    
  }

  getStudentInfo(id: any) {
    return this.globalApiService.postRequest(this.getStudentInfoUrl, { 'id': id })
    
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

  // getAll(page: any) {
  //   return this.globalApiService.postRequest(this.getAllforGridUrl, 1).pipe(map((data: any) => this.getPagedData(page, data)));
  // }

  getAll(page: Page, searchKeyword: any): Observable<PagedData<any>> {
    return this.globalApiService.postRequest(this.getAllforGridUrl, {
      'first_name': searchKeyword,
      'page_number': page.pageNumber + 1,
      'page_size': page.size,
    }).pipe(map(data => this.getPagedData(page, data.data)));
  }
  
  private getPagedData(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.student.data && data.student.data.length) {
      var gridRecords = data.student.data;
      
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
