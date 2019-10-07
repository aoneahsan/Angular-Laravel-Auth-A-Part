import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth-service';
import { User } from 'src/app/service/auth/user-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  userSubs: Subscription;
  isLoading: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.userSubs = this._authService.User.subscribe(
      data => {
        this.user = data;
      }
    );
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
