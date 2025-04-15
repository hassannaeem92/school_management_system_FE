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
  selector: 'app-add-update-studen-image',
  templateUrl: './add-update-studen-image.component.html',
  styleUrls: ['./add-update-studen-image.component.scss']
})
export class AddUpdateStudenImageComponent {
  
  minDate: any;
  bloodGroupArray: any = [];

  genderArray: any = [];
  religionArray: any = [];
  requiredField: string = "Field is required"
  paramId: any;
  model: any = {}
  isUpdate: any = false;
  isCamopen: any = false;
  isTakePiced: any = false;
  isBrowse: any = false;

  isTakePicEnable: any = false;

  ImageFile: any;
  getImage: any;

  constructor(
    private commonService: CommonService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute, private studentService: StudentService,
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

      if (fetchData.data && fetchData.data.student.profile_photo) {
        var result = fetchData.data.student.profile_photo;

        this.getImage = result;
        

        
      } else {
        this.getImage = '';
        
      }
      this.ngxService.stop()

    });     
 }

 
 updateStudentImage(f: NgForm) {
    this.isUpdate = true;

    const body = {
      
    }


    // setTimeout(() => {
    //   this.studentService.createStudent(body).subscribe((data: any) => {
    //     if(data && data.message == 'Student successfully registered!')
        
    //     this.router.navigate(['/student']);
    //   })
    //  });
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

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr: string[] = dataurl.split(',');
    const mime: any = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr: string = atob(arr[arr.length - 1]);
    let n: number = bstr.length;
    const u8arr: Uint8Array = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

//   getImageData(event: any) {
//     if (event) {

//       var i = this.dataURLtoFile(event, 'studentImage');

// 
//       this.ImageFile = i;
      
//       const body = {
//         profile_photo: this.ImageFile,
//         student_id: this.paramId
//       }
//     setTimeout(() => {
//       this.studentService.updateImage(body).subscribe((data: any) => {
//         
//         if(data && data.message == 'Student successfully registered!')
        
//         this.router.navigate(['/student']);
//       })
//      });


//     } else {
//       this.ImageFile = null;
//     }
  //   }
  
  changeOccure(event: any) {
    
    // this.takePic();
    // this.onOpenCamera();
    
  }

  getTakeData(e: any) {
    if (e == '' || e == null) {
      this.toastr.error('Please take a picture again');
      return
    }

    if (e) { 
      
      this.getImage = e;
    }

  }

  getImageData(event: any) {
    
    if (event == '' || event == null) {
      this.toastr.error('Please take a picture');
      return
    }

    this.ngxService.start()

    if (event) {
      const i = this.dataURLtoFile(`data:image/jpeg;base64,${event}`, 'studentImage');
      
      this.ImageFile = i;
      
      const formData = new FormData();
      formData.append('profile_photo', this.ImageFile);
      formData.append('student_id', this.paramId);

      const body = {
        profile_photo: this.ImageFile,
        student_id: this.paramId
      };
  
      setTimeout(() => {
        this.studentService.updateImage(formData).subscribe((data: any) => {
        
        if(data && data.message == 'Student`s profile photo successfully updated!')
                  
          this.router.navigate(['/student']);
          this.ngxService.stop()
          this.toastr.success(data.message);

          
        })
      });
    } else {
      this.ImageFile = null;
    }
  }
  
  onBrowseClicke() {
    this.isTakePicEnable = true
    this.isBrowse = false
    setTimeout(() => {
      this.isBrowse = true
      
    }, 1000);
    
  }

  onOpenCamera() {
    this.isTakePicEnable = false
    this.isCamopen = false
    setTimeout(() => {
      
      this.isCamopen = true
    }, 1000);
   
  }

  takePic() {
    this.isTakePicEnable = true
    this.isTakePiced = false
    setTimeout(() => {
      
      this.isTakePiced = true
    }, 1000);
   
  }


}
