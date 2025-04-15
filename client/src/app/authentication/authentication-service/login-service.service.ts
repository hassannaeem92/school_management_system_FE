import { Injectable } from '@angular/core';
import { GlobalApiCallService } from 'src/shared-resources/_services/global-api-call.service';
import { environment } from 'src/app/enviroments/enviroment';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private loginUrl = environment.baseUrl + 'admin/login';
  private signUpUrl = environment.baseUrl + 'admin/store';
  private removeSessionUrl = environment.baseUrl + 'admin/login';

  constructor(private globalApiService: GlobalApiCallService) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  removeSession(email?: any) {
    return this.globalApiService.postRequest(this.removeSessionUrl, { email: email });
  }

  onLogin(body: any) {
    return this.globalApiService.postRequest( this.loginUrl, body);
  }

  signUp(body: any) {
    return this.globalApiService.postRequest( this.signUpUrl, body);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  isLoggedIn() {
  
    return !!localStorage.getItem('token');

    // const token = this.getToken();
    // 
    // // const token = (localStorage.getItem('token'))
    // // const decodedToken: any = jwt_decode(localStorage.getItem.);
    // // console.log(decodedToken);

    // // const expirationDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds
    // // const currentDate = new Date();

    // if (token) {
    //   const parts = token.split('|');
    //   const result = parts.length > 1 ? parts[1].trim() : ''; 
    //   const expirationDate = this.getExpirationDate(result);
    //   
    //   var t = 'Bearer' + token;
    //   t = JSON.stringify(t);
    //   const currentDate = new Date();
    //   const decodedToken: any = jwt_decode(t);
    //    //const expirationDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds

    //   // if (currentDate > expirationDate) {
    //   //   return false
    //   // } else {
    //   //   return true
    //   // }
    // } else {
    //   return false;
    // }
    // return true


    // // if (currentDate > expirationDate) {
    // //   return false
    // // } else {
    // //   return true
    // // }

  }

  
private getExpirationDate(token: string) {
  const expiry: any = jwt_decode(token);
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}


}



