import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClassServiceService } from 'src/app/services/class/class-service.service';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent implements OnInit {
  model: any = {};
  minDate: any;
  maxDate: any;

  mode: any;
  activityType: any = "home";
  docModel: any = {};
  paramId: any;

  constructor(public classService: ClassServiceService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.ngxService.start()
    
    setTimeout(() => {
      this.route.params.subscribe((paramsId: any) => {
        if (paramsId && paramsId.id) {
          this.paramId = paramsId.id
          this.getById(this.paramId);
          
        } else {
          this.ngxService.stop()
          
        }
      });
    }, 1000);

  }

  getById(paramId: any) {
    
    this.classService.getClassInfo(paramId).subscribe((fetchData: any) => {
      
      if (fetchData && fetchData.status == 200 && fetchData.class && fetchData.class.length) {
        this.model.className = fetchData.class[0].class_name
        this.ngxService.stop()

      } else {
        
      }
      
    });     
  }
  
  save(f: NgForm) {
    this.ngxService.start()
    if (this.model.className) {

      const body = {
        className: this.model.className,
        classId: this.paramId
      }

      this.classService.updateClass(body).subscribe((data: any) => {
        if (data && data.status == 200) {
          f.resetForm();
          this.toastr.success(data.message);  
          this.router.navigate(["/class"]);
        } else {
          this.toastr.error(data.message);  
          
        }
        this.ngxService.stop()
      })
    }
  }
  clearForm() {
    this.model = {};
  }
 

}
