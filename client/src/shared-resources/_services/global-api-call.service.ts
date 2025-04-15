import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subscription, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalApiCallService {

    constructor(private httpClient: HttpClient) {
        
    }
 
    postRequest(url: any, data?: any, header?: any): Observable<any> {
        // const url = 'https://api.example.com/endpoint'; // Replace with your API endpoint URL
        // const data = { name: 'John', age: 30 }; // Replace with your data object
      

        return this.httpClient.post(url, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle the error here or rethrow it
            console.error('POST request error', error);
            return throwError(error); // Return an observable
          })
        );
  }
  
  patchRequest(url: any, data?: any, header?: any): Observable<any> {
    // const url = 'https://api.example.com/endpoint'; // Replace with your API endpoint URL
    // const data = { name: 'John', age: 30 }; // Replace with your data object
  

    return this.httpClient.patch(url, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here or rethrow it
        console.error('POST request error', error);
        return throwError(error); // Return an observable
      })
    );
}

  
    getRequest(url: any, data?: any, header?: any): Observable<any> {
      return this.httpClient.get(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle the error here or rethrow it
          console.error('GET request error', error);
          return throwError(error); // Return an observable
        })
      );
    }
  
        // this.httpClient.post(url, data).subscribe(
        //     response => {
        //       console.log('POST request successful', response);
        //       return response
        //     },
        //     error => {
        //         console.log('POST request error', error);
        //         return error
        //       // Handle any errors here
        //     }
        //   );
      }


//   saveData(event, storeName) {
//     return this.dbService
//       .add(storeName, {
//         requestBody: event.requestBody,
//       });
//   }
//   postRequestWithBlob(apiUrl, requestBody, type?): Observable<any> {
//     return this.httpClient.post(apiUrl, requestBody, { responseType: 'blob' })
//       .pipe(
//         map(res => new Blob([res], { type }))
//       );
//   }

//   getRequestWithBlob(apiUrl, type?): Observable<any> {
//     return this.httpClient.get(apiUrl, { responseType: 'blob' })
//       .pipe(
//         map(res => new Blob([res], { type }))
//       );
//   }
//   putRequest(apiUrl, requestBody, paramHeaders?) {
//     return this.httpClient.put<any>(apiUrl, requestBody);
//   }

//   

  

  

