import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-update-document',
  templateUrl: './add-update-document.component.html',
  styleUrls: ['./add-update-document.component.scss']
})
export class AddUpdateDocumentComponent {
  minDate: any;
  bloodGroupArray: any = [];
  formData: FormData = new FormData();

  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required"
  paramId: any;
  isCreate: any = true;
  documentsArray: any = [];
  formDoc: any;
  uploadedFiles: any = [];
  docArrayName: any = ['previous_school_result_card', 'character_certificate', 'birth_certificate', 'b_form'];
  documentExistarray: any = [];


  currentDocumentId: any;
  enableBC: any = true;
  enableBF: any = true;
  enableCC: any = true;
  enableRC: any = true;


  model: any = {
    student_id: "",
    birth_certificate: "",
    b_form: "",
    character_certificate: "",
    previous_school_result_card: "",
  }

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute, private studentService: StudentService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private dropdownService: DropdownServiceService) {
    
  }
  ngOnInit(): void {
    this.minDate = new Date();

    this.route.params.subscribe((paramsId: any) => {
      if (paramsId && paramsId.id) {
        this.paramId = paramsId.id
        this.getById(paramsId.id);
        
      }
      
    });

    this.getBloodGroups();
    this.getReligions();
    this.getGender();

    
  }

  getById(paramId: any) {
    this.ngxService.start()

    this.studentService.getStudentInfo(paramId).subscribe((fetchData: any) => {
      
      this.model.gender = {};

      if (fetchData.data && fetchData.data.student.document) {
        var result = fetchData.data.student.document;

        if (result.b_form !== "") {
          this.uploadedFiles.push({files: result.b_form, fileName: 'B Form', fileValue: 'b_form' });
        }
        if (result.birth_certificate !== "") {
        this.uploadedFiles.push({files: result.birth_certificate, fileName: 'Parent CNIC', fileValue: 'birth_certificate'});
        }
        if (result.character_certificate !== "") {
        this.uploadedFiles.push({files: result.character_certificate, fileName: 'Character Certificate', fileValue: 'character_certificate'});         
        }
          if (result.previous_school_result_card !== "") {
        this.uploadedFiles.push({files: result.previous_school_result_card, fileName: 'Previous Result Card', fileValue: 'previous_school_result_card'});
        }
        this.currentDocumentId = result.id;
        

        this.documentsArray = result;
        this.isCreate = false;
        this.model = result
         
        

      } else {
        this.uploadedFiles = [];
      }
      this.ngxService.stop()
      this.enableButtons();
    });     



 }

  updateDocument(f: NgForm) {
    
    if (this.documentExistarray.length <= 0) {
      this.toastr.error('Please select File');
      return
    }
    this.ngxService.start()

    var url: any
    if (this.isCreate) {
      this.formData.append('student_id', this.paramId);
      url = this.studentService.createDocument(this.formData)
    } else if(!this.isCreate) {
      this.formData.append('id', this.currentDocumentId);
      url = this.studentService.updateDocument(this.formData)  
    }

    setTimeout(() => {
      url.subscribe((data: any) => {
        if (data.responseCode == 200) {
          
          this.router.navigate(["/student"]);
          
          this.toastr.success(data.responseMessage);
        }

        this.ngxService.stop()
        
      });
     });
    this.model = {};
    
  }

  getGender() {
    this.studentService.getGenderArray().subscribe(data => {
      if (data && data.data.genders && data.data.genders.length) {
        var groups = data.data.genders;
        this.genderArray = groups.map((x: any) => {
          return {
            id: x.id, 
            name: x.gender
          }
        })
      } else {
        
      }
    })
  }
  getBloodGroups() {
    
  this.studentService.getBloodGroupsArray().subscribe(data => {
   if (data && data.data.blood_groups && data.data.blood_groups.length) {
     var groups = data.data.blood_groups;
     this.bloodGroupArray = groups.map((x: any) => {
       return {
         id: x.id, 
         name: x.blood_group
       }
     })
   } else {
     
   }
   
 })
  }
  
  getReligions() {
    
    this.studentService.getReligionArray().subscribe(data => {
      if (data && data.data.religions && data.data.religions.length) {
        var groups = data.data.religions;
        this.religionArray = groups.map((x: any) => {
          return {
            id: x.id, 
            name: x.religion
          }
        })
      } else {
        
      }
    })
  }

  onlyDecimalNumberKey(event: any) {
    return this.commonService.onlyDecimalNumberKey(event);
  }

  clearForm(name: any) {
    this.model = {};

  }

  appendFiles(file: any, name: any) {
    this.formData.append(name, file[0]);
    this.documentExistarray.push(name);
    }

  onSelectFile(event: any, fileTypeName: any) {
    //MultiFiles Selection and Upload
    
    // Utils.showLoader("#Form1");
    var fileName = [];
    var fileSelect: any;
    var url;
    //for (let i = 0; i < event.target.files.length; i++) {

      // if (event.target.files && event.target.files[0]) {
      fileName = event.target.files[0].name;
      fileSelect = event.target.files[0];
      var maxFileSizeInBytes: any = 5 * 1024 * 1024;
      const reader = new FileReader();
      if ((
        fileSelect.type === 'application/pdf' ||
        fileSelect.type === 'application/xlsx' ||
        fileSelect.type === 'application/vnd.ms-excel' && fileSelect.size <= maxFileSizeInBytes
      )) {
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (events: any) => { // called once readAsDataURL is completed 
          url = events.target.result;
          
        };

        if (fileTypeName == 'chrCertificate') {
          this.model.character_certificate = event.target.files
          this.appendFiles(event.target.files, 'character_certificate')
        }
        if (fileTypeName == 'birthCertificate') {
          // this.model.birth_certificate = event.target.files
          this.appendFiles(event.target.files, 'birth_certificate')
          
        }
        if (fileTypeName == 'beForm') {
          // this.model.b_form = event.target.files
          this.appendFiles(event.target.files, 'b_form')
          
        }
        if (fileTypeName == 'result') {
          // this.model.previous_school_result_card = event.target.files
          this.appendFiles(event.target.files, 'previous_school_result_card')
          
        }

      }
      else {
        // Utils.notification(Constants.Only_pdf_or_zip_file_are_allowed_to_upload, 'error');

        setTimeout(() => {
          location.reload();

        }, 1500);
        return
      }

    // }
    // var arrayFile = event.target.files;
    // var fileNameDisplay = event.target.files[0].name;
    // Utils.hideLoader("#Form1");

  }

  downloadFile(item: any) {
    window.open(item, '_blank');
  }

  DeleteFile(fileNameForDel: any) {
 
    const body = {
      id: this.currentDocumentId,
      document_name: fileNameForDel
    }

    this.studentService.deleteDocument(body).subscribe((result: any) => {
      var nArr: any = [];
      
      if (result.responseCode == 200) {

        this.uploadedFiles.forEach((x: any) => {
          if (x.fileValue == fileNameForDel) {
            nArr = this.uploadedFiles.filter((obj: any) => obj.fileValue !== fileNameForDel)
          }
        });
        
        
        this.uploadedFiles = [];
        this.uploadedFiles = nArr;

        this.toastr.success(result.responseMessage);
                
      }
    })

    // if (this.uploadedFiles && this.uploadedFiles.length) {

    //   // let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.some((file: any) => file.fileValue === docName));
    //   let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.map((file: any) => file.fileValue).includes(docName));
    //   console.log(missingFiles);
    //   debugger
    // } else {
    //   this.enableBC = false;
    //   this.enableBF = false;
    //   this.enableCC = false;
    //   this.enableRC = false;
    // }
    this.enableButtons();

  }

  enableButtons() {
    
    setTimeout(() => {
      if (this.uploadedFiles && this.uploadedFiles.length) {
        let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.map((file: any) => file.fileValue).includes(docName));
        console.log(missingFiles);
        
        // Update the enable flags based on missing files
        this.enableBC = missingFiles.includes('birth_certificate');
        this.enableBF = missingFiles.includes('b_form');
        this.enableCC = missingFiles.includes('character_certificate');
        this.enableRC = missingFiles.includes('previous_school_result_card');
      } else {
        this.enableBC = true;
        this.enableBF = true;
        this.enableCC = true;
        this.enableRC = true;
      }
    }, 1000);
  }


  downloadPrintFunctionality(file: any) {
    
    var fileType = 'pdf';
    if (fileType == 'pdf') {
      
      const pdfUrl = file
      
      this.directPrint(file);
      } 
      
    
    document.body.style.cursor = 'default';
    // Utils.hideLoader(div);
  }

  cancel() {
    this.documentExistarray = [];
  }

  directPrint(data: any) {
    
    let body = (this.documentsArray.b_form as any);
    this.formDoc = body;
    var blob = new Blob([body], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    let pdfWindow = window.open(url);
    
   
    // setTimeout(() => {
    //   pdfWindow?.focus();
    //   pdfWindow?.print();
    // }, 1000);
  }

}
