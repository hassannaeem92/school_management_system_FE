import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import * as moment from "moment";
import { FormControl, NgForm } from '@angular/forms';
import { FeeService } from 'src/app/services/student-fee/fee.service';
import { MatDatepicker } from '@angular/material/datepicker';
declare const $: any

@Component({
  selector: 'app-fee-installment',
  templateUrl: './fee-installment.component.html',
  styleUrls: ['./fee-installment.component.scss']
})
export class FeeInstallmentComponent {
  date = new FormControl(moment());

  model: any = {};
  months: any;
  dataModal: any
  minDate: any;
  maxDate: any;
  isPosted: boolean = false
  previousValue: any;
  mode: any;
  paramId: any
  activityType: any = "home";
  docModel: any = {};
  currYear: any;
  currMonth: any;

  activeStudentId: any;
  currentFeeId: any;
  activeAmount: any;
  actualAmount: any;

  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required";
  formData: FormData = new FormData();
  statusArray: any = [
    { id: 0, name: "Un Paid" },
    { id: 1, name: "Paid" },
  ];
  studentArray: any = [];

  constructor(
    private commonService: CommonService,
    private ngxService: NgxUiLoaderService,
    private feeService: FeeService,

    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private teacherService: TeacherService,

    private dropdownService: DropdownServiceService
  ) {}

  ngOnInit(): void {
    this.model.dynamicArray = [];
    this.minDate = new Date();
    this.maxDate = new Date();

    this.model.registrationDate = new Date();
    this.model.status = true;
    this.getSectionsList();

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramId = paramsId.id
        this.mode = "edit";
        this.getById(paramsId.id);
      } else {
        this.mode = "create";
      }
    });
  }

  getById(paramId: any) {

    const body = {
      transaction_id: Number(paramId)
    }

    this.feeService.getById(body).subscribe((data: any) => {
      if (data.status == 200) {
        $('#collapseExample').collapse('toggle');

        if (data && data.data) {
          
          var result = data.data;
          this.dataModal = data.data;
          this.isPosted = result.paid_status == 1 ? true : false
          this.model.activeStudent = this.studentArray.find((x: any) => x.id == result.student_id);
          this.model.class = result.class_name;
          this.model.section = result.section_name ? result.section_name : '';
          this.model.amount = result.total_amount;
          this.model.fromDate = moment(result.month).format("YYYY-MM-DD");
          this.model.section = result.section_name;
          // this.model.pendingAmount = result.total_amount - result.paid_amount
          this.model.paidAmount = result.paid_amount
          
          var date = moment(result.month);
          this.currYear = date.format("YYYY");
          this.currMonth = date.format("MMMM");
      
          this.onDateChange();
        }
      }
    });

  }

  clearForm(name: any, form: any) {
    this.model = {};
  }

  showInstallment() {
    if (this.model.fromDate && this.model.toDate && this.model.activeStudent) {
      this.addRow(true, this.model.installmentNum);
    }
  }

  onlyDecimalNumberKey(event: any) {
    return this.commonService.onlyDecimalNumberKey(event);
  }

  validateInstallment(event: any): void {
    const input = event.target.value;
    if (input !== "" && (Number(input) < 1 || Number(input) > 10)) {
      event.target.value = "";
    } else {
      this.model.installmentNum = input;
    }
  }

  getSectionsList() {
    this.feeService.getStudent().subscribe((data: any) => {
      if (data.status == 200) {
        if (
          data &&
          data.result &&
          data.result.records &&
          data.result.records.length
        ) {
          var groups = data.result.records;
          this.studentArray = groups.map((x: any) => {
            return {
              id: x.id,
              name:
                x.first_name +
                " " +
                x.last_name +
                " : " +
                x.registration_number,
            };
          });

          // this.sectionArrayTemp = JSON.parse(JSON.stringify(this.sectionArray));
        } else {
        }
      }
    });
  }

  onPaidAmountChange(event: any) {
    
    var val = Number(event.target.value);
    if (val > this.model.pendingAmount) {
      this.model.paidAmount = '';
      this.toastr.error('Paid Amount should be less than or equal to Pending Amount');
    }
  }

  create(f?: NgForm, isPostedCheck?: any) {
    this.ngxService.start();

    var insList: any = [];


    const body = {
    
      fee_id: this.dataModal.fee_id,
      month: moment(this.model.fromDate).format('YYYY-MM-DD'),
      paid_amount: parseFloat(this.model.paidAmount),
      paid_status: isPostedCheck ? true : false,
      payment_method: 'cash',
      total_amount: parseFloat(this.model.amount),
      id: Number(this.paramId)

    };

    setTimeout(() => {
      this.feeService.createFees(body).subscribe((data: any) => {
        ;
        if (data && data.status == 201) {
          this.router.navigate(["/feeCollection"]);
          this.toastr.success("Update SuccessFully");
          this.ngxService.stop();
        } else if (data.status == 400) {
          this.toastr.error(data.error.msg);
          this.ngxService.stop();

        } else {
          this.toastr.error("Failled to Add Fee");
          this.ngxService.stop();
        }
        this.ngxService.stop();

      });
    });
    this.ngxService.stop();

   
  }

  onDateChange(event?: any, dateType?: string) {
    
    this.model.dynamicArray = [];
    if (dateType == "fromDate") {
      var fromCurrentDate = event;
    } else {
      var toCurrentDate = event;
    }

    
    const body = {
          feeId: this.dataModal.fee_id,
          date: moment(this.model.fromDate).format('YYYY-MM-DD'),
        }
    this.feeService.getPendingAmount(body).subscribe((data: any) => {
      
      if (data && data.status == 200) {
        this.model.pendingAmount = data.pendingAmount

        var rem = this.mode.amount - this.model.pendingAmount
        this.model.isMonthFeePaid = rem == 0 ? true : false

      }
    });
  }

  studentChange(event: any) {
    this.activeStudentId = event.id;

    this.model.installmentNum = "";
    this.model.fromDate = null;
    this.model.toDate = null;
    this.model.dynamicArray = [];

    const body = {
      studentId: this.activeStudentId,
    };

    this.feeService.getStudentFeeDetail(body).subscribe((data: any) => {
      if (data && data.status == 200 && data.details && data.details.length) {
        
     
        this.model.class = ''
        this.model.section = ''
        this.model.fromDate = null

        this.currentFeeId = data.details[0].fee_id;
        this.model.amount = JSON.parse(
          JSON.stringify(data.details[0].fee_amount)
        );
        this.model.class = data.details[0].class_name
        this.model.section = data.details[0].section_name
        this.model.fromDate = new Date();

        this.actualAmount = JSON.parse(
          JSON.stringify(data.details[0].fee_amount)
        );

        this.onDateChange()

      }
    });
  }

  statusChange(event: any, row: any) {}

  addRow(inputChange?: any, ins?: any) {
    if (inputChange) {
      this.model.dynamicArray = [];
    }

    if (this.model.dynamicArray) {
      const installmentCount = parseInt(ins, 10);
      const amountPerInstallment = this.activeAmount / installmentCount;

      for (let i = 0; i < installmentCount; i++) {
        this.model.dynamicArray.push({
          amount: amountPerInstallment.toFixed(2),
          status: "Un paid",
        });
      }
    }
  }

  setInstallment(updatedIndex: number, previousAmount: number, status: any) {
    ;
    const installmentCount = this.model.dynamicArray.length;

    // Get the updated amount
    const updatedAmount = parseFloat(
      this.model.dynamicArray[updatedIndex].amount
    );

    // Calculate the difference between the previous amount and the updated amount
    const difference = this.previousValue - updatedAmount;

    // Distribute the difference to the subsequent rows
    let remainingDifference = difference;
    if (status == "Un paid") {
      if (updatedIndex < installmentCount - 1) {
        for (let i = updatedIndex + 1; i < installmentCount; i++) {
          let currentAmount = parseFloat(this.model.dynamicArray[i].amount);

          // Adjust the amount for the current row
          let newAmount = currentAmount + remainingDifference;

          // If the new amount is negative, set it to zero and carry forward the difference
          if (newAmount < 0) {
            remainingDifference = newAmount; // Carry forward the negative amount
            newAmount = 0;
          } else {
            remainingDifference = 0;
          }

          // Set the new amount for the current row
          this.model.dynamicArray[i].amount = newAmount.toFixed(2);

          // If the remaining difference is zero, no need to adjust further rows
          if (remainingDifference === 0) {
            break;
          }
        }
      } else {
        for (let i = 0; i < installmentCount; i++) {
          let currentAmount = parseFloat(this.model.dynamicArray[i].amount);

          // Adjust the amount for the current row
          let newAmount = currentAmount + remainingDifference;

          // If the new amount is negative, set it to zero and carry forward the difference
          if (newAmount < 0) {
            remainingDifference = newAmount; // Carry forward the negative amount
            newAmount = 0;
          } else {
            remainingDifference = 0;
          }

          // Set the new amount for the current row
          this.model.dynamicArray[i].amount = newAmount.toFixed(2);

          // If the remaining difference is zero, no need to adjust further rows
          if (remainingDifference === 0) {
            break;
          }
        }
      }
    } else {
      this.toastr.error("Ammount Paid cannot change");
    }
  }

  setDeleteRowAmount(deletedIndex: number) {
    const installmentCount = this.model.dynamicArray.length;

    const deletedAmount = parseFloat(
      this.model.dynamicArray[deletedIndex].amount
    );

    this.model.dynamicArray.splice(deletedIndex, 1);

    let remainingDifference = deletedAmount;

    for (let i = 0; i < this.model.dynamicArray.length; i++) {
      let index = (deletedIndex + i) % this.model.dynamicArray.length;
      let currentAmount = parseFloat(this.model.dynamicArray[index].amount);

      let newAmount = currentAmount + remainingDifference;

      this.model.dynamicArray[index].amount = newAmount.toFixed(2);

      remainingDifference = 0;

      if (remainingDifference === 0) {
        break;
      }
    }
  }

  onAmountChange(row: any, updatedIndex: any) {
    ;
    const input = Number(row.amount);
    const activeAmount = Number(this.activeAmount);

    if (input < 0 || input > activeAmount) {
      this.model.dynamicArray[updatedIndex].amount = 0;
      const previousAmount = parseFloat(row.amount);
      this.setInstallment(updatedIndex, previousAmount, row.status);
    } else {
      // Ensure the updated row amount is set to the input value
      this.model.dynamicArray[updatedIndex].amount = input.toFixed(2);
      const previousAmount = parseFloat(row.amount);
      this.setInstallment(updatedIndex, previousAmount, row.status);
      this.previousValue = null;
    }
  }

  checkAmountLimit(row: any, index: any) {
    ;
    const input = row.amount;
    if (
      input !== "" &&
      (Number(input) <= 0 || Number(input) > Number(this.activeAmount))
    ) {
      this.model.dynamicArray = [];
      this.showInstallment();
    }
  }

  getPreviousValue(event: any, row: any) {
    this.previousValue = parseFloat(row.amount);
  }

  removeRow(event: any, row: any, index: any) {
    ;
    this.getPreviousValue(event, row);
    // this.model.dynamicArray.splice(index, 1);
    this.setDeleteRowAmount(index);
  }

  downloadFile() {}

  onItemSelect(labelId: any, event: any) {}

  onItemDeSelect(labelId: any, selectId: any) {}

  onSelectAll(labelId: any) {}

  onDeSelectAll(labelId: any) {}

  chosenYearHandler(normalizedYear: moment.Moment, dateType: string) {
    const ctrlValue = this.model[dateType]
      ? moment(this.model[dateType])
      : moment();
    ctrlValue.year(normalizedYear.year());
    this.model[dateType] = ctrlValue;
  }

  chosenMonthHandler(
    normalizedMonth: moment.Moment,
    datepicker: MatDatepicker<any>,
    dateType: string
  ) {
  
    const ctrlValue = this.model[dateType]
      ? moment(this.model[dateType])
      : moment();
    ctrlValue.month(normalizedMonth.month());
    this.model[dateType] = ctrlValue;
    datepicker.close();
    this.onDateChange(normalizedMonth, dateType);


  }

//   printElement(elementId: string) {
//     
//     const printContents = document.getElementById(elementId)?.innerHTML;
//     const originalContents = document.body.innerHTML;
  
//     if (printContents) {
//       document.body.innerHTML = printContents;

   
      
//       window.onafterprint = () => {
//         console.log('After print or cancel');
    
//         document.body.innerHTML = originalContents;
//         this.methodToCall();
        
//         window.onbeforeprint = null;
//         window.onafterprint = null;
//     };
    
//       window.print();
//       // window.onbeforeprint = () => {
//       //   console.log('Before print');
//       //   // Call your method here
//       //   document.body.innerHTML = originalContents;
//       //   this.methodToCall();
//       // };
//     }
//   }
  

//   methodToCall() {
//     
//     // Replace with your custom method logic
//     console.log('Method executed');
//     this.getById(this.paramId);
//     // Perform actions you want to execute on print or cancel
  // }
  
  
  printElement(sectionId: string) {
    const printContents = document.getElementById(sectionId)?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`<html> <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f8f8;
            }
            .invoice-container {
              width: 80%;
              margin: 50px auto;
              background-color: #fff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #ddd;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .invoice-header h1 {
              font-size: 24px;
              margin: 0;
            }
            .invoice-header img {
              max-width: 100px;
            }
            .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .invoice-details div {
              width: 48%;
            }
            .invoice-details h3 {
              margin: 0 0 10px 0;
            }
            .invoice-details p {
              margin: 5px 0;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .invoice-table th, .invoice-table td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            .invoice-table th {
              background-color: #f4f4f4;
            }
            .invoice-total {
              text-align: right;
              margin-bottom: 20px;
            }
            .invoice-total p {
              font-size: 18px;
              margin: 0;
            }
            .invoice-footer {
              text-align: center;
              border-top: 1px solid #ddd;
              padding-top: 20px;
              color: #999;
            }
            </style> <head><title>Print Window</title></head><body>`);
            newWindow.document.write(printContents);
            newWindow.document.write('</body></html>');
            newWindow.document.close();
            newWindow.print();
            newWindow.close();
        } else {
            alert('Failed to open a new window. Please check your browser settings.');
        }
    }
}


}
