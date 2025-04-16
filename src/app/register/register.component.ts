import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  displayErrorMessage: string = '';
  registerform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(`^[A-Z][a-z0-9]{6,14}$`),
    ]),
  });

  constructor(private _authservice: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.postionTop()
  }

  get f() {
    return this.registerform.controls
  }

  submitRegisterForm() {
    const email = this.f['email'].value
    const password = this.f['password']?.value
    if (this.registerform.valid) {
      this._authservice.register(email, password)
        .then(() => this._router.navigate(['/login']))
        .catch((error) => {
          console.log(error.message)
          const modifiedErrorMessage = this.errorMessageEdit(error.message);
          this.displayErrorCode(modifiedErrorMessage);
        });
    }
  }

  public errorMessageEdit(errorCodeEdit: string): string {
    const errorCode: { [key: string]: string } = {
      'Firebase: Error (auth/email-already-in-use).': 'The email is already in use'
    }
    return errorCode[errorCodeEdit];
  }

  displayErrorCode(message: string) {
    this.displayErrorMessage = message
  }

  postionTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
