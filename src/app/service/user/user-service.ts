import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _siteUiService: SiteUIService
  ) {}

  // Super Admin Part Start

  allUser() {
    const data = JSON.parse(localStorage.getItem('userDetails'));
    return this._http.post<any>(
      this._siteUiService.getHttpRequestUrl() + "alluser",
      data
    )
    .pipe(
      catchError(this.errorHandle)
    );
  }

  addUser(data) {
    return this._http.post(
      this._siteUiService.getHttpRequestUrl() + "adduser",
      data
    )
    .pipe(
      catchError(this.errorHandle)
    );
  }

  editUser(data) {
    return this._http.post(
      this._siteUiService.getHttpRequestUrl() + "edituser",
      data
    )
    .pipe(
      catchError(this.errorHandle)
    );
  }

  editUserImage(data) {
    return this._http.post(
      this._siteUiService.getHttpRequestUrl() + "edituserimage",
      data
    )
    .pipe(
      catchError(this.errorHandle)
    );
  }

  // errorHandle function to handle errors from login and signup trys.
  private errorHandle(errorRes: HttpErrorResponse) {
    let errorMessage = "an error occured";
    switch (errorRes.message) {
      case "The given data was invalid.":
        errorMessage = "The given data was invalid.";
        break;
      default:
        errorMessage = "Error Occured";
        break;
    }
    return throwError(errorMessage);
  }

  // Super Admin Part Ends

}
