import { AuthService } from './../auth/auth-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteUIService } from './../site/site-ui-service';

@Injectable({
  providedIn: "root"
})
export class PropertyService {

    constructor(
        private _http: HttpClient,
        private _siteUiService: SiteUIService,
        private _auhService: AuthService
    ) {}

    getAllProperties() {
        const userId = this._auhService.userId;
        const data = {
            id: userId
        }
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "properties",
            data
        );
    }

    addProperty(data) {
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "add-property",
            data
        );
    }

    addPropertyImage(data) {
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "add-property-image",
            data
        );
    }

    editProperty(data) {
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "edit-property",
            data
        );
    }

    editImage(data) {
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "edit-property-image",
            data
        );
    }

    deleteProperty(propertyId) {
        return this._http.post<any>(
            this._siteUiService.getHttpRequestUrl() + "delete-property",
            propertyId
        );
    }
}
