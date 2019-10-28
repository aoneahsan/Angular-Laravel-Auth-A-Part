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
  userRoleSelected: boolean = false;
  userRole_Franchise: boolean = true;
  userRole: string;

  regions;

  constructor(private _authService: AuthService, private router: Router, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this.regions = this._siteUiService.getRegions();
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
        // console.log("new user data (from signup component) = "+ data);
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

  userRoleChange_F() {
    this.userRole_Franchise = true;
  }
  userRoleChange_C() {
    this.userRole_Franchise = false;
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
