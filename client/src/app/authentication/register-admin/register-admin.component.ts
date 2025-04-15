import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../authentication-service/login-service.service';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  email: any;
  password: any;
  deviceName: any;
  model: any = {};  


  constructor(
    private platform: Platform,
    private http: HttpClient,
    private loginService: LoginServiceService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getDeviceName();
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    } else {
      this.router.navigate(['register'])
      
    }

    this.email = '';
    this.password = '';
  }

  


  signUp(): void {
    const body = {
     
      
        password: this.model.password,
        email: this.model.email,
        first_name: this.model.firstName,
        last_name: this.model.lastName,
        

    };

    // this.http.post<any>('/api/user/login', payload).subscribe(
    //   response => {
    //     console.log(response);
    //     // Handle the response from the server here
    //   },
    //   error => {
    //     console.error(error);
    //     // Handle any errors here
    //   }
    // );

    this.loginService.signUp(body).subscribe(data => {
      data
      
      if (data) {       
        this.router.navigate(["login"]);
      }

    })


  }

  getDeviceName() {
     this.deviceName = this.platform.ANDROID ? 'android' : this.platform.IOS  ? 'IOS' : 'Windows'
  }
}
