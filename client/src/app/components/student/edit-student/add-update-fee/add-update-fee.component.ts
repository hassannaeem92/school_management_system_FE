import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';

@Component({
  selector: 'app-add-update-fee',
  templateUrl: './add-update-fee.component.html',
  styleUrls: ['./add-update-fee.component.scss']
})
export class AddUpdateFeeComponent {

  studentFee: any;
  minDate: any;
  paramId: any;
 

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute, private studentService: StudentService,
    private dropdownService: DropdownServiceService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {
    
  }


  ngOnInit(): void {
    this.minDate = new Date();

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramId = paramsId.id
        this.getById(paramsId.id);
      }
    });
  }

  getById(paramId: any) {
    this.ngxService.start()

    this.studentService.getAmountById(paramId).subscribe((fetchData: any) => {
      
      this.studentFee = '';
      if (fetchData.status == 200) {
        var result = fetchData.amountData[0].fee_amount;
        
        this.studentFee = result ? result : '';
      } else {
        
      }
      this.ngxService.stop()

    });     
 }

  onlyDecimalNumberKey(event: any) {
    return this.commonService.onlyDecimalNumberKey(event);
  }

  create(f: NgForm) {
    this.ngxService.start()
    const body = {
      feeAmount: this.studentFee,
      studentId: this.paramId
     
    }
   
    var requestBody: any; 
    var url: any;
    
      requestBody = body
      var url: any = this.studentService.createStudentFee(requestBody)
   

    setTimeout(() => {
      url.subscribe((data: any) => {
        
        if (data && data.status == 200) {
          this.toastr.success(data.success.msg);
          this.router.navigate(['/student']);
        } else {
          this.ngxService.stop()
          this.toastr.error('Failed to Add');
        }
      })
     });
    this.studentFee = {};
    
  }

  clearForm(name: any) {
    this.studentFee = '';
  }

}
