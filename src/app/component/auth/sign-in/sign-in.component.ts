import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth-service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error: string = "";
  actionObservable: Observable<any>;

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this._authService.signIn(form.value).subscribe(
      data => {
        console.log("new coming data (from signIn component) = ", data);
        this.router.navigate(['/']);
      },
      error => {
        this.error = error;
      }
    )
  }

}
