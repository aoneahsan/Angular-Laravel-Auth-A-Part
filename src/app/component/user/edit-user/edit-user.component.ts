import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user/user-service';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  error: string = "";
  isLoading: boolean = false;
  loadingSubs: Subscription;
  isAuth: boolean = false;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isFranchiseUser: boolean = false;
  isClient: boolean = false;
  userId: string;

  regions;
  // user fields
  Uname: string; Uphone_number: string; Usegment: string; Ucnpj: string;
  Ucpf: string; Uplace_of_issue: string;  Utelephone: string; Uprofession: string;
  Umariage_status: string; Ugender: string; Udate_of_birth: string; Uzip_code: string; Uaddress: string;
  Unumber: string; Uneighborhood: string; Ucomplement: string;  Ustate: string; Uuf: string;
  Ucompany_name: string; Uadmin_user: string; USelectedRegion: string = "Florida";
  fileToUpload: File;
  formData: FormData = new FormData();
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _siteUiService: SiteUIService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.regions = this._siteUiService.getRegions();
    this._authService.getuserDetails().subscribe(
      userData => {
        //  console.log(userData);
         if(userData.data)
         {
          this.Uname = userData.data.name;
          this.Uphone_number = userData.data.phone_number;
          this.Usegment = userData.data.segment;
          this.Ucpf = userData.data.cpf;
          this.USelectedRegion = userData.data.region;
          this.Uplace_of_issue = userData.data.place_of_issue;
          this.Utelephone = userData.data.telephone;
          this.Uprofession = userData.data.profession;
          this.Umariage_status = userData.data.mariage_status;
          this.Ugender = userData.data.gender;
          this.Udate_of_birth = userData.data.date_of_birth;
          this.Uzip_code = userData.data.zip_code;
          this.Unumber = userData.data.number;
          this.Uaddress = userData.data.address;
          this.Uneighborhood = userData.data.neighborhood;
          this.Ucomplement = userData.data.complement;
          this.Ustate = userData.data.state;
          this.Uuf = userData.data.uf;
          this.Ucnpj = userData.data.cnpj;
          this.Ucompany_name = userData.data.company_name;
          this.Uadmin_user = userData.data.admin_user;
         }
        else
        {
          alert("here");
        }
        this._siteUiService.isLoading.next(false);
      }
    );
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this._authService.User.subscribe(
      user => {
        this.isAuth = !!user;
        if(!!user) {
          this.userId = user.id;
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

  onSubmit(form: NgForm) {
    // console.log("submit");
    this.formData.append("userId", this.userId);
    this._siteUiService.isLoading.next(true);
    // console.log(form.value);
    this._userService.editUser(form.value).subscribe(
      data => {
        // console.log("first done");
        this.changeUserImage();
      }
    )
    form.reset();
  }

  changeUserImage() {
    // console.log("second start");
    return this._userService.editUserImage(this.formData).subscribe(
      data=>{
        // console.log("third done");
        this._router.navigate(['/user']);
    });
  }

  imageUploaded(files: FileList){
    this.fileToUpload = files.item(0);
    this.formData.append('profile_image', this.fileToUpload, this.fileToUpload.name);
    // console.log("images");
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
