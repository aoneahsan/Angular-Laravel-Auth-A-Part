import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user/user-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  error: string = "";
  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(private _userService: UserService, private router: Router, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this._siteUiService.isLoading.next(true);
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
  }

  onSubmit(form: NgForm) {
    this._siteUiService.isLoading.next(true);
    // console.log(form.value);
    this._userService.addUser(form.value).subscribe(
      data => {
        this._siteUiService.isLoading.next(false);
        this.router.navigate(['/all-user']);
      },
      error => {
        this._siteUiService.isLoading.next(false);
        this.error = error;
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
