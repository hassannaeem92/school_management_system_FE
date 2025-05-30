import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {

  constructor(private router: Router) {

  }

  homeBtnClick() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

}
