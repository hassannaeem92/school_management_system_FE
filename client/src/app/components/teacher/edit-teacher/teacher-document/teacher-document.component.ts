import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { CommonService } from 'src/shared-resources/_services/common.service';
import { DropdownServiceService } from 'src/shared-resources/_services/dropdown-service.service';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-document',
  templateUrl: './teacher-document.component.html',
  styleUrls: ['./teacher-document.component.scss']
})
export class TeacherDocumentComponent {
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
  docArrayName: any = ['cv', 'cnic', 'experience_letter', 'agreement', 'matriculation', 'inter_or_higher'];
  documentExistarray: any = [];


  currentDocumentId: any;
  enableCV : any = true
  enableCNIC : any = true
  enableIH : any = true
  enableEL : any = true
  enableM : any = true
  enableA : any = true
 


  model: any = {
    matriculation: "",
    cv: "",
    cnic: "",
    experience_letter: "",
    agreement: "",
    inter_or_higher: "",
  }

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute, private studentService: StudentService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private teacherService: TeacherService,
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

  }

  getById(paramId: any) {
    
    this.ngxService.start()

    this.teacherService.getTeacher(paramId).subscribe((fetchData: any) => {
      
      this.model.gender = {};

      if (fetchData.responseCode == 200 && fetchData.data && fetchData.data.document) {
        var result = fetchData.data.document;

        if (result.cv !== "") {
          this.uploadedFiles.push({files: result.cv, fileName: 'Resume', fileValue: 'cv' });
        }
        if (result.cnic !== "") {
        this.uploadedFiles.push({files: result.cnic, fileName: 'CNIC', fileValue: 'cnic'});
        }
        if (result.inter_or_higher !== "") {
        this.uploadedFiles.push({files: result.inter_or_higher, fileName: 'Inter or Higher', fileValue: 'inter_or_higher'});         
        }
        if (result.agreement !== "") {
        this.uploadedFiles.push({files: result.agreement, fileName: 'Agreement', fileValue: 'agreement'});
        }
        if (result.experience_letter !== "") {
          this.uploadedFiles.push({files: result.experience_letter, fileName: 'Experience Letter', fileValue: 'experience_letter'});
        }
        if (result.matriculation !== "") {
          this.uploadedFiles.push({files: result.matriculation, fileName: 'Matriculation', fileValue: 'matriculation'});
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
      this.formData.append('teacher_id', this.paramId);
      url = this.teacherService.createDocument(this.formData)
    } else if(!this.isCreate) {
      this.formData.append('id', this.currentDocumentId);
      url = this.teacherService.updateDocument(this.formData)  
    }

    setTimeout(() => {
      url.subscribe((data: any) => {
        if (data.responseCode == 200) {
          
          this.router.navigate(["/teacher"]);
          
          this.toastr.success(data.responseMessage);
        }

        this.ngxService.stop()
        
      });
     });
    this.model = {};
    
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

        if (fileTypeName == 'inter_or_higher') {
          // this.model.inter_or_higher = event.target.files
          this.appendFiles(event.target.files, 'inter_or_higher')
        }
        if (fileTypeName == 'cv') {
          // this.model.birth_certificate = event.target.files
          this.appendFiles(event.target.files, 'cv')
          
        }
        if (fileTypeName == 'cnic') {
          // this.model.b_form = event.target.files
          this.appendFiles(event.target.files, 'cnic')
          
        }
        if (fileTypeName == 'matriculation') {
          // this.model.previous_school_result_card = event.target.files
          this.appendFiles(event.target.files, 'matriculation')
          
        }
        if (fileTypeName == 'experience_letter') {
          // this.model.previous_school_result_card = event.target.files
          this.appendFiles(event.target.files, 'experience_letter')
          
        }
        if (fileTypeName == 'agreement') {
          // this.model.previous_school_result_card = event.target.files
          this.appendFiles(event.target.files, 'agreement')
          
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

    this.teacherService.deleteDocument(body).subscribe((result: any) => {
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

    if (this.uploadedFiles && this.uploadedFiles.length) {

      // let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.some((file: any) => file.fileValue === docName));
      let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.map((file: any) => file.fileValue).includes(docName));
      console.log(missingFiles);
      
    } else {
      this.enableCV = false;
      this.enableCNIC = false;
      this.enableIH = false;
      this.enableEL = false;
    }
    this.enableButtons();

  }

  enableButtons() {
    
    setTimeout(() => {
      if (this.uploadedFiles && this.uploadedFiles.length) {
        let missingFiles = this.docArrayName.filter((docName: any) => !this.uploadedFiles.map((file: any) => file.fileValue).includes(docName));
        console.log(missingFiles);
        
        // Update the enable flags based on missing files
        this.enableCV = missingFiles.includes('cv');
        this.enableCNIC = missingFiles.includes('cnic');
        this.enableIH = missingFiles.includes('inter_or_higher');
        this.enableEL = missingFiles.includes('experience_letter');
        this.enableM = missingFiles.includes('matriculation');
        this.enableA = missingFiles.includes('agreement');
      
      } else {
        this.enableCV = true;
        this.enableCNIC = true;
        this.enableIH = true;
        this.enableEL = true;
        this.enableM = true;
        this.enableA = true;
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
