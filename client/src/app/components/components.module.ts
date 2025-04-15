import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainViewComponent } from './main-view.component';


@NgModule({
  declarations: [
      MainViewComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ComponentsModule { }
