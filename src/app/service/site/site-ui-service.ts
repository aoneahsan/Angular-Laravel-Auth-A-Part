import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SiteUIService {

  // for My Localhost Work
  // private httpRequestsUrl: string = "http://marketingob-laravel.ahsan/api/";
  // for Live Site Process
  private httpRequestsUrl: string = "http://localhost:8000/api/";

  isLoading = new Subject<boolean>();

  regions = ['Delaware', 'Florida', 'Georgia', 'Maryland', 'North Carolina'];

  getRegions() {
    return this.regions;
  }

  getHttpRequestUrl() {
    return this.httpRequestsUrl;
  }

}
