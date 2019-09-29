import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth-service';


@Injectable({providedIn: 'root'})

export class UnAuthGuardService implements CanActivate{

    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    boolean | 
    UrlTree | 
    Promise<boolean | UrlTree> | 
    Observable<boolean | UrlTree> {
        return this._authService.User.pipe(
            take(1),
            map(
                user => {
                    const isAuth = !!user;
                    if (!isAuth) {
                        return true;
                    }
                    return this._router.createUrlTree(['/dashboard']);
                }
            )
        )
    }

}