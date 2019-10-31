import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/service/auth/auth-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { PropertyService } from 'src/app/service/property/property-service';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit, OnDestroy {

  error: string = "";
  isLoading: boolean = false;
  loadingSubs: Subscription;
  fileToUpload: File;
  formData: FormData = new FormData();
  regions;
  userId: any;
  propertyId: any;

  constructor(
    private _router: Router, 
    private _propertyService: PropertyService,
    private _siteUiService: SiteUIService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.propertyId = this._route.snapshot.params['id'];
    this.formData.append('propertyId', this.propertyId);
    this.regions = this._siteUiService.getRegions();
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this.userId = this._authService.userId;
  }

  onSubmit(form: NgForm) {
    // this._siteUiService.isLoading.next(true);
    // console.log(form.value);
    this._propertyService.editProperty(form.value).subscribe(
      data => {
        // console.log("new user data (from signup component) = "+ data);
        this.changeImage();
      },
      error => {
        this._siteUiService.isLoading.next(false);
        this.error = error;
      }
      );
      // form.reset();
  }
  
  changeImage() {
    // console.log("second start");
    return this._propertyService.editImage(this.formData).subscribe(
      data=>{
        // console.log("third done");
        this._siteUiService.isLoading.next(false);
        this._router.navigate(['/properties']);
    });
  }

  imageUploaded(files: FileList){
    this.fileToUpload = files.item(0);
    this.formData.append('image', this.fileToUpload, this.fileToUpload.name);
    // console.log("images");
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
