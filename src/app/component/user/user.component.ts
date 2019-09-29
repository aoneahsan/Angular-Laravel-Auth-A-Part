import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData = null;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getuserDetails().subscribe(
      userDetails => {
        this.userData = userDetails;
        // console.log(this.userData);
      }
    )
  }

  getData() {
    this.userData = null;
    this._authService.getuserDetails().subscribe(
      userDetails => {
        this.userData = userDetails;
        // console.log(this.userData);
      }
    )
  }

}
