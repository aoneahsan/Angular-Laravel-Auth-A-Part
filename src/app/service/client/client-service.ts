import { AuthService } from 'src/app/service/auth/auth-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SiteUIService } from 'src/app/service/site/site-ui-service';

@Injectable({
    providedIn: "root"
})
export class ClientService {
    
    constructor(
        private _http: HttpClient, 
        private _siteUiService: SiteUIService,
        private _authService: AuthService
    ) {}

    getOwnRegionAgents() {
        const userId = this._authService.userId;
        const region = this._authService.userRegion;
        const token = this._authService.apiRequestToken;
        const data: {id, api_token, region} = {id: userId, api_token: token, region: region};
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "getownregionagents",
            data
        );
    }

    getSpecificRegionAgents(selectedRegion: string) {
        const data: {region} = {region: selectedRegion};
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "searchagent",
            data
        );
    }

    getAllAgents() {
        const userId = this._authService.userId;
        const token = this._authService.apiRequestToken;
        const data: {id, api_token} = {id: userId, api_token: token};
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "allagent",
            data
        );
    }
}