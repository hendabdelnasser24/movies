import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  displayErrorMessage: string = '';
  logInform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(`^[A-Z][a-z0-9]{6,14}$`),
    ]),
  });

  constructor(private _authservice: AuthService, private _router: Router) { }

  get f() {
    return this.logInform.controls
  }

  submitlogInForm() {
    const email = this.f['email'].value
    const password = this.f['password']?.value
    if (this.logInform.valid) {
      this._authservice
        .signIn(email, password)
        .then((res) => {

          localStorage.setItem('userToken', res.user.refreshToken)
          this._authservice.saveData();
          this._router.navigate(['/home']);
        }
        )
        .catch((error) => {
          const modifiedErrorMessage = this.errorMessageEdit(error.message);
          this.displayErrorCode(modifiedErrorMessage);
        });
    }
  }

  public errorMessageEdit(errorCodeEdit: string): string {
    const errorCode: { [key: string]: string } = {
      'Firebase: Error (auth/invalid-credential).': 'Please check your email or password'
    }
    return errorCode[errorCodeEdit];
  }

  displayErrorCode(message: string) {
    this.displayErrorMessage = message
  }

}
