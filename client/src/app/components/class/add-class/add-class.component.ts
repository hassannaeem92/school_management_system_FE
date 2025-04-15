import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClassServiceService } from 'src/app/services/class/class-service.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  constructor(private classService: ClassServiceService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }
  
  ngOnInit(): void {
  }
  
  save(f: NgForm) {
    this.ngxService.start()
    if (this.model.className) {

      const body = {
        className: this.model.className
      }

      this.classService.createClass(body).subscribe((data: any) => {
        
        if (data && data.status == 200) {
          f.resetForm();
          this.toastr.success(data.success.msg);  
          this.router.navigate(["/class"]);
        } else if (data.status == 400) {
          this.toastr.error(data.error.msg);  
          this.ngxService.stop()
          
        }
        this.ngxService.stop()
      })
    }
  }

  model: any = {};
  minDate: any;
  maxDate: any;

  mode: any;
  activityType: any = "home";
  docModel: any = {};

}
