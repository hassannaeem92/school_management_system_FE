import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationInterceptor } from './services/application.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import the MatSnackBarModule
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'rgba(0, 0, 0, 0.5)',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 60,
  bgsType: SPINNER.circle,
  fgsColor: '#00ACC1',
  fgsPosition: POSITION.centerCenter,
  fgsType: SPINNER.circle,
};

@NgModule({
  declarations: [
    AppComponent,
    
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot()
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApplicationInterceptor,
    multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
