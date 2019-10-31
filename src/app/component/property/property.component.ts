import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { PropertyService } from './../../service/property/property-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { compilePipeFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  propertyData = new MatTableDataSource<any>();
  displayedColumns = ['id', 'title', 'description', 'price', 'image', 'Edit', 'Delete'];
  isLoading: boolean = false;
  loadingSubs: Subscription;
  errorMessage: string;


  constructor(private _propertyService: PropertyService, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this._siteUiService.isLoading.next(true);
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this.getPropertiesData();
  }

  getPropertiesData() {
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
    );
  }

  deleteProperty(propertyId: number) {
    const userA = confirm("Do You Want To Delete This Property?");
    if (userA) {
      this._siteUiService.isLoading.next(true);
      this._propertyService.deleteProperty(propertyId).subscribe(
        response => {
          this.getPropertiesData();        
        },
        errorR => {
          this.getPropertiesData();
        }
      );      
    }
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
