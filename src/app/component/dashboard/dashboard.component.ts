import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  role: string;
  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(private _authService: AuthService, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this._siteUiService.isLoading.next(true);
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this._authService.getuserDetails().subscribe(
      userData => {
        // console.log("User Role = ",userData.data.roles[0].id);
        this._siteUiService.isLoading.next(false);
        this.role = userData.data.role_name;
      }
    )
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
