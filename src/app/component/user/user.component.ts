import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userData = null;
  isLoading: boolean = false;
  loadingSubs: Subscription;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isFranchiseUser: boolean = false;
  isClient: boolean = false;

  constructor(private _authService: AuthService, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    )
    this._authService.getuserDetails().subscribe(
      userDetails => {
        this.userData = userDetails;
        // console.log(this.userData);
        this._siteUiService.isLoading.next(false);
        // console.log(this.userData);
      }
    );
    this._authService.User.subscribe(
      user => {
        if(!!user) {
          if (user.roleId == 1) {
            this.isSuperAdmin = true;
          } else if(user.roleId == 2) {
            this.isAdmin = true;
          } else if(user.roleId == 3) {
            this.isFranchiseUser = true;
          } else if(user.roleId == 4) {
            this.isClient = true;
          }
        }
      }
    );
  }

  getData() {
    this._siteUiService.isLoading.next(true);
    this.userData = null;
    this._authService.getuserDetails().subscribe(
      userDetails => {
        this.userData = userDetails;
        this._siteUiService.isLoading.next(false);
        // console.log(this.userData);
      }
    )
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
