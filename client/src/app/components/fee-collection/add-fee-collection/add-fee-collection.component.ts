import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { StudentService } from "src/app/services/student/student.service";
import { TeacherService } from "src/app/services/teacher/teacher.service";
import { CommonService } from "src/shared-resources/_services/common.service";
import { DropdownServiceService } from "src/shared-resources/_services/dropdown-service.service";
import * as moment from "moment";
import { FormControl, NgForm } from "@angular/forms";
import { FeeService } from "src/app/services/student-fee/fee.service";
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: "app-add-fee-collection",
  templateUrl: "./add-fee-collection.component.html",
  styleUrls: ["./add-fee-collection.component.scss"],
})
export class AddFeeCollectionComponent {
  date = new FormControl(moment());

  model: any = {};
  months: any;
  minDate: any;
  maxDate: any;

  previousValue: any;
  mode: any;
  activityType: any = "home";
  docModel: any = {};

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
        this.mode = "edit";
        this.getById(paramsId.id);
      } else {
        this.mode = "create";
      }
    });
  }

  getById(paramId: any) {}

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

  create(f: NgForm) {
    this.ngxService.start();

    var insList: any = [];
    // this.model.dynamicArray.forEach((x: any, i: any) => {
    //   insList.push({
    //     amount: Number(x.amount),
    //     installment_num: i+1,
    //     paid_status: x.id == 1 ? true : false,
    //   });
    // });

    const body = {
    
      fee_id: this.currentFeeId,
      month: moment(this.model.fromDate).format('YYYY-MM-DD'),
      paid_amount: parseFloat(this.model.paidAmount),
      paid_status: false,
      payment_method: 'cash',
      total_amount: parseFloat(this.model.amount)

    };

    setTimeout(() => {
      this.feeService.createFees(body).subscribe((data: any) => {
        
        if (data && data.status == 201) {
          this.router.navigate(["/feeCollection"]);
          this.toastr.success("Fee added SuccessFully");
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


  onPaidAmountChange(event: any) {
    
    var val = Number(event.target.value);
    if (val > this.model.pendingAmount) {
      this.model.paidAmount = '';
      this.toastr.error('Paid Amount should be less than or equal to Pending Amount');
    }
  }
  onDateChange(event?: any, dateType?: string) {
        this.model.dynamicArray = [];
    if (dateType == "fromDate") {
      var fromCurrentDate = event;
    } else {
      var toCurrentDate = event;
    }

    
    const body = {
          feeId: this.currentFeeId,
          date: moment(this.model.fromDate).format('YYYY-MM-DD'),
        }
    this.feeService.getPendingAmount(body).subscribe((data: any) => {
      
      if (data && data.status == 200) {
        this.model.pendingAmount = data.pendingAmount
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
}
