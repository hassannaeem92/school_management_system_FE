import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../authentication-service/login-service.service';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  

  
export class LoginComponent implements OnInit {
  
  email: any;
  password: any;
  deviceName: any;
  isTestLogin: any = false
  constructor(
    private platform: Platform,
    private http: HttpClient,
    private loginService: LoginServiceService,
    private router: Router,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.getDeviceName();
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    } else {
      
        this.router.navigate(['login'])
  
    }

    this.email = '';
    this.password = '';
  }

  
  login(): void {
    const body = {
     
        password: this.password,
        email: this.email,
        device_name: this.deviceName
    

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

    this.loginService.onLogin(body).subscribe(data => {
      // data
      // console.log(data.status)
      // console.log(data.status)
      if (data && data.data.status == 200) {       
        this.isTestLogin == true
        console.log( data.data.token)
        console.log( data)
        localStorage.setItem('token', data.data.token)
        this.router.navigate(["dashboard"]);
        this.toastr.success('Login SuccessFully');
      } else if(data.message == 'The provided credentials are incorrect.', 'Success'){
        this.toastr.error('Incorect email Or password', 'Toastr fun!');
        
      }

    }, (error) => {
      this.toastr.error('Incorect email Or password', 'Error!');
    })

 
  }

  getDeviceName() {
     this.deviceName = this.platform.ANDROID ? 'android' : this.platform.IOS  ? 'IOS' : 'Windows'
  }

}
