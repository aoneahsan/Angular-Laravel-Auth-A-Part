import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SiteUIService } from 'src/app/service/site/site-ui-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  error: string = "";
  isLoading: boolean = false;
  loadingSubs: Subscription;

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
    // console.log(form.value);
    this._authService.signUp(form.value).subscribe(
      data => {
        console.log("new user data (from signup component) = "+ data);
        this._siteUiService.isLoading.next(false);
        this.router.navigate(['/']);
      },
      error => {
        this._siteUiService.isLoading.next(false);
        this.error = error;
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
