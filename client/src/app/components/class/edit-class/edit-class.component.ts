import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  ngOnInit(): void {
    this.model.firstName = 'Ten';
    this.model.lastName = 'Ali';

  }

  model: any = {};
  minDate: any;
  maxDate: any;

  mode: any;
  activityType: any = "home";
  docModel: any = {};
}
