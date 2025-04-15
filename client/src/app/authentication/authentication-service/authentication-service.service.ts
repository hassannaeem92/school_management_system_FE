import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  
  constructor() { }

  async validateSession() {
    return false;
  }
}
