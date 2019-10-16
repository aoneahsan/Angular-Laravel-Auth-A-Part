import { MatTableDataSource } from '@angular/material';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../../service/auth/auth-service';
import { ClientService } from './../../../service/client/client-service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit, OnDestroy {

  user_region ;
  userSub: Subscription;
  isLoading: boolean = true;
  loadingSub: Subscription;
  error: string;
  agentsData = new MatTableDataSource<any>();
  displayedColumns = ['id', 'name', 'region', 'email', 'photo', 'phone_number'];
  loadingAgents: boolean = false;
  regions;
  selectedRegionValue;

  constructor(
    private _authService: AuthService,
    private _clientService: ClientService,
    private _siteUiService: SiteUIService
  ) { }

  ngOnInit() {
    this.getAgentsInMyRegion();
    this.loadingSub = this._siteUiService.isLoading.subscribe(
      status => {
        this.isLoading = status;
      }
    );
    this.regions = this._siteUiService.getRegions();
    this.userSub = this._authService.User.subscribe(
      userData => {
        this.user_region = userData.region;
        this.selectedRegionValue = userData.region;
        this._siteUiService.isLoading.next(true);
      }
    );
  }

  getAgentsInMyRegion() {
    this.loadingAgents = false;
    this._clientService.getOwnRegionAgents().subscribe(
      agents => {
        this.agentsData = agents.data;
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      },
      errorData => {
        this.error = "Error Occured";
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      }
    )
  }

  getAgentBySpecificRegion() {
    this.loadingAgents = false;
    this._clientService.getSpecificRegionAgents(this.selectedRegionValue).subscribe(
      agents => {
        this.agentsData = agents.data;
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      },
      errorData => {
        this.error = "Error Occured";
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      }
    )
  }

  getAllAgents() {
    this.loadingAgents = false;
    this._clientService.getAllAgents().subscribe(
      agents => {
        this.agentsData = agents.data;
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      },
      errorData => {
        this.error = "Error Occured";
        this._siteUiService.isLoading.next(true);
        this.loadingAgents = true;
      }
    )
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
