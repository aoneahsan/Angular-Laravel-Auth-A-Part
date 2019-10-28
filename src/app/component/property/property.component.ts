import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { PropertyService } from './../../service/property/property-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  propertyData = new MatTableDataSource<any>();
  displayedColumns = ['id', 'title', 'description', 'price', 'image'];
  isLoading: boolean = false;
  loadingSubs: Subscription;
  errorMessage: string;


  constructor(private _propertyService: PropertyService, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this._siteUiService.isLoading.next(true);
    this._propertyService.getAllProperties().subscribe(
      properties => {
        this._siteUiService.isLoading.next(false);
        // console.log(properties.data);
        this.propertyData = properties.data;
      },
      error => {
        this._siteUiService.isLoading.next(false);
        // console.log(error);
        this.errorMessage = "SomeThing Went Wrong";
      }
    )
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
