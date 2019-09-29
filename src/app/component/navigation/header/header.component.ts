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
  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this._authService.User.subscribe(
      user => {
        this.isAuth = !!user;
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
