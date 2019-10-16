import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/service/user/user-service';
import { SiteUIService } from 'src/app/service/site/site-ui-service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit, OnDestroy {

  usersData = new MatTableDataSource<any>();
  displayedColumns = ['id', 'name', 'email', 'phone_number'];
  isLoading: boolean = false;
  loadingSubs: Subscription;


  constructor(private _userService: UserService, private _siteUiService: SiteUIService) { }

  ngOnInit() {
    this.loadingSubs = this._siteUiService.isLoading.subscribe(
      state => {
        this.isLoading = state;
      }
    );
    this._siteUiService.isLoading.next(true);
    this._userService.allUser().subscribe(
      users => {
        this._siteUiService.isLoading.next(false);
        // console.log(users.data);
        this.usersData = users.data;
      }
    )
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
