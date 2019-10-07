import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user-model';
import { SiteUIService } from '../site/site-ui-service';

// interface to recive data

@Injectable({
    providedIn: "root"
})
export class AuthService {

  // for My Localhost Work
  // url: string = "http://marketingob-laravel.ahsan/api/";
  // for Live Site Process
  url: string = "http://localhost:8000/api/";

  User = new BehaviorSubject<User>(null);
  userId: number;
  userRoleId: number;
  userDetails;
  tokenExpirationTime;
  constructor(private _http: HttpClient, private router: Router, private _siteUiService: SiteUIService) {}

  // signin functions
  signIn(data) {
      return this._http.post(
          this.url + "login",
          data
      ).pipe(
          catchError(this.errorHandle),
          tap(
              resData => {
                  this.authanticate(resData);
              }
          )
      );
  }

  // signup function
  signUp(data) {
      return this._http.post(
          this.url + "register",
          data
      )
      .pipe(
          catchError(this.errorHandle),
          tap(
              resData => {
                  this.authanticate(resData);
              }
          )
      );
  }

  // logout function
  logout() {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const requestData = {
        id: userData.id
    }
    this.User.next(null);
    localStorage.removeItem('userDetails');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
    return this._http.post(
        this.url + "logout",
        requestData
    );
  }

  // errorHandle function to handle errors from login and signup trys.
  private errorHandle(errorRes: HttpErrorResponse) {
    this._siteUiService.isLoading.next(true);
    let errorMessage = "an error occured";
    if (!errorRes.error || !errorRes.error.error) {
      this._siteUiService.isLoading.next(false);
      return throwError(errorMessage);
    }
    switch (errorRes.message) {
        case "The given data was invalid.":
            errorMessage = "The given data was invalid.";
            break;
        default:
            errorMessage = "Error Occured";
            break;
    }
    this._siteUiService.isLoading.next(false);
    return throwError(errorMessage);
  }

  // function to handle authenticate requests
  private authanticate(resData) {
    console.log(resData);
    this._siteUiService.isLoading.next(true);
    const expireIn = new Date().getTime() + 3600000;
    const newUser = new User(
        resData.data.id,
        resData.data.role_id,
        resData.data.email,
        resData.data.api_token,
        expireIn
      );
      this.userId = resData.data.id;
      this.userRoleId = resData.data.role_id;
      this.User.next(newUser);
      // console.log("User = " , newUser);
      localStorage.setItem('userDetails', JSON.stringify(newUser));
      this.autoLogout();
      this._siteUiService.isLoading.next(false);
  }

  // Function to perform autologin
  autoLogin() {
    this._siteUiService.isLoading.next(true);
      const userData = JSON.parse(localStorage.getItem('userDetails'));
      if(!userData) {
          return;
      }
      const checkExpireTime = new Date().getTime();
      if(userData.expireIn <= checkExpireTime) {
        this.logout();
      }

      const loadUser = new User(
          userData.id,
          userData.roleId,
          userData.email,
          userData._tokken,
          userData.expireIn
      );
      this.autoLogout();
      if (loadUser.token) {
          // console.log(loadUser);
          this.User.next(loadUser);
      }
      this._siteUiService.isLoading.next(false);
  }

  autoLogout() {
    // for one hour uncomment below one
    const expireTime = 3600000;
    // for two hour uncomment below one
    // const expireTime = 7200000;
    // for three hour uncomment below one
    // const expireTime = 10800000;
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
      this.router.navigate(['/']);
    }, expireTime);
  }

  // to get user rofile data
  getuserDetails() {
    this._siteUiService.isLoading.next(true);
      const userData = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(this.User);
      const newUserData: {id: string, email: string, token: string} = {
          id: userData.id,
          email: userData.email,
          token: userData._tokken
      };
      return this._http.post<any>(
          this.url + "userData",
          newUserData
      ).pipe(
        catchError(this.tokenErrorHandle)
      );
  }

  tokenErrorHandle(errorRes: HttpErrorResponse) {
    // console.log(errorRes);
    this._siteUiService.isLoading.next(false);
    return throwError(errorRes);
  }
}
