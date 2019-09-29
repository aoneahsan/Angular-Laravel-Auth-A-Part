import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  maxDate;
  error: string = "";

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this._authService.signUp(form.value).subscribe(
      data => {
        console.log("new user data (from signup component) = "+ data);
        this.router.navigate(['/']);
      },
      error => {
        this.error = error;
      }
    )
  }

}
