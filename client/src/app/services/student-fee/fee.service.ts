import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalApiCallService } from 'src/shared-resources/_services/global-api-call.service';
import * as moment from 'moment';
import { PagedData } from 'src/shared-resources/paged-data';
import { Page } from 'src/shared-resources/page';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private getAllforGridUrl = environment.nodeBaseUrl + 'fee/getStudentsWithFees';
  private getStudentUrl = environment.nodeBaseUrl + 'student/getStudentDropdown';
  private getPendingAmountUrl = environment.nodeBaseUrl + 'fee/getPendingAmount';
  private getStudentFeeDetailUrl = environment.nodeBaseUrl + 'fee/getFeeDetail';
  private createFeeUrl = environment.nodeBaseUrl + 'fee/createFee';
  private getByIdUrl = environment.nodeBaseUrl + 'fee/getById';
  private deleteTransactionUrl = environment.nodeBaseUrl + 'fee/deleteTransaction';



  constructor(private globalApiService: GlobalApiCallService) { }



  getAll(page: Page, searchKeyword: any): Observable<PagedData<any>> {
    return this.globalApiService.postRequest(this.getAllforGridUrl, {
      'searchKeyword': searchKeyword,
      'page_number': page.pageNumber + 1,
      'page_size': page.size,
    }).pipe(map(data => this.getPagedData(page, data)));
  }
  
  private getPagedData(page: Page, data: any): PagedData<any> {
    
    let pagedData = new PagedData<any>();

    if (data.result && data.result.records.length) {
      var gridRecords = data.result.records;
      
      page.totalElements = data.result.pagination.total;
      if (gridRecords && gridRecords.length > 0) {
        for (let i = 0; i < gridRecords.length; i++) {
          let jsonObj = gridRecords[i];
          let parentType = '';
          if (jsonObj?.parentValueId != null) {
            parentType = jsonObj?.parentType + ': ' + jsonObj?.parentValueId
          } else {
            parentType = jsonObj?.parentType
          }
          debugger
          
          var date = moment(jsonObj.month);
          var currYear = date.format("YYYY");
          var currMonth = date.format("MMMM");

          let obj = {
            // sNo: i + 1,
            id_student: jsonObj.id,
            idS: i + 1,
            name: jsonObj?.first_name + ' '+ jsonObj?.last_name,
            registrationNumber: jsonObj?.registration_number ? jsonObj?.registration_number : '',
            feeAmount: jsonObj?.fee_amount ? jsonObj?.fee_amount : '',
            fee_id: jsonObj?.fee_id ? jsonObj?.fee_id : '',
            paid_status: jsonObj.paid_status == 0 ? false : true,
            id: jsonObj.transaction_id ? jsonObj.transaction_id : '',
            month: currMonth,
            year: currYear
            

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

  getStudent() {
    return this.globalApiService.postRequest(this.getStudentUrl, {})
    
  }

  getPendingAmount(body: any) { 
    return this.globalApiService.postRequest(this.getPendingAmountUrl, body)
  }

  getById(body: any) { 
    return this.globalApiService.postRequest(this.getByIdUrl, body)
  }

  getStudentFeeDetail(body: any) {
    return this.globalApiService.postRequest(this.getStudentFeeDetailUrl, body)
    
  }

  createFees(body: any) {
    return this.globalApiService.postRequest(this.createFeeUrl, body)
    
  }

  deleteTransaction(body: any) {
    return this.globalApiService.postRequest(this.deleteTransactionUrl, body);
  }

}
