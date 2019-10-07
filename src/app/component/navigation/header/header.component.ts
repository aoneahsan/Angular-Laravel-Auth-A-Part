import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('sideBartoggle') sideBartoggle = new EventEmitter<void>();
  isAuth: boolean = false;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isFranchiseUser: boolean = false;
  isClient: boolean = false;
  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuth = false;
    this.isSuperAdmin = false;
    this.isAdmin = false;
    this.isFranchiseUser = false;
    this.isClient = false;
    this._authService.User.subscribe(
      user => {
        this.isAuth = !!user;
        if(!!user) {
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
    )
  }

  sideBarToggle() {
    this.sideBartoggle.emit();
  }

  logout() {
    this._authService.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
      }
    );
  }

}
