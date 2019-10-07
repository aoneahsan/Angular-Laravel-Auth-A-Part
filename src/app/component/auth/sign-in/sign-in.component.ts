import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth-service';

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SiteUIService } from 'src/app/service/site/site-ui-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  error: string = "";
  actionObservable: Observable<any>;
  loadingSubs: Subscription;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private router: Router, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    )
  }

  onSubmit(form: NgForm) {
    this._siteUiService.isLoading.next(true);
    this._authService.signIn(form.value).subscribe(
      data => {
        // console.log("new coming data (from signIn component) = ", data);
        this._siteUiService.isLoading.next(false);
        this.router.navigate(['/']);
      },
      error => {
        this._siteUiService.isLoading.next(false);
        this.error = error;
      }
    )
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
