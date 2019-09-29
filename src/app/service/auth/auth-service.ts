import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user-model';

// interface to recive data

@Injectable({
    providedIn: "root"
})
export class AuthService {

    url: string = "http://localhost:8000/api/";
    
    User = new BehaviorSubject<User>(null);
    userId: number;
    userDetails;
    constructor(private _http: HttpClient, private router: Router) {}    
    
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
        return this._http.post(
            this.url + "logout",
            requestData
        );
    }

    // errorHandle function to handle errors from login and signup trys.
    private errorHandle(errorRes: HttpErrorResponse) {
        let errorMessage = "an error occured";
        if (!errorRes.error || !errorRes.error.error) {
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
        return throwError(errorMessage);
    }

    // function to handle authenticate requests
    private authanticate(resData) {
        const newUser = new User(
            resData.data.id,
            resData.data.email,
            resData.data.api_token
        );
        this.userId = resData.id;
        this.User.next(newUser);
        console.log("User = " , newUser);
        localStorage.setItem('userDetails', JSON.stringify(newUser));
    }

    // Function to perform autologin
    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userDetails'));
        if(!userData) {
            return;
        }
        
        const loadUser = new User(
            userData.id, 
            userData.email,
            userData._tokken,
        );

        if (loadUser.token) {
            console.log(loadUser);
            this.User.next(loadUser);            
        }
    }

    // to get user rofile data
    getuserDetails() {
        const userData = JSON.parse(localStorage.getItem('userDetails'));
        // console.log(this.User);
        const newUserData: {id: string, email: string, token: string} = {
            id: userData.id,
            email: userData.email,
            token: userData._tokken
        };
        return this._http.post(
            this.url + "userData",
            newUserData
        );
    }
}