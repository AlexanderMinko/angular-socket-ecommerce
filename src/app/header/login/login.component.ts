import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RegistrationRequest } from '../../model/dto/registration-request';
import { LoginRequest } from '../../model/dto/login-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authFormGroup: FormGroup;
  isLoginMode: boolean = true;
  errorMessage: string;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), this.notOnlyWhitespace]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), this.notOnlyWhitespace]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  notOnlyWhitespace(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'notOnlyWhitespace': true };
    } else {
      return null;
    }
  }

  get email() { return this.authFormGroup.get('email'); }
  get password() { return this.authFormGroup.get('password'); }
  get firstname() { return this.authFormGroup.get('firstname'); }
  get lastname() { return this.authFormGroup.get('lastname'); }

  onChangeToRegistration(): void {
    this.isLoginMode = false;
  }

  onSignInWithGoogle(): void {
    this.authService.signInWithGoogle(this.activeModal);
  }

  onSignInWithFB(): void {
    this.authService.signInWithFB(this.activeModal);
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.login()
    } else {
      this.registration();
    }
  }

  private login() {
    if (this.email.invalid && this.password.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
    } else {
      const loginRequest: LoginRequest = new LoginRequest();
      loginRequest.email = this.email.value;
      loginRequest.password = this.password.value;
      this.authService.login(loginRequest).subscribe(
        data => {
          console.log(data);
          this.activeModal.dismiss('Cross click');
        }, error => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 401)) {
            this.errorMessage = "Invalid email or password!"
          } else {
            this.errorMessage = error.message;
          }
        });
    }
  }

  private registration() {
    if (this.authFormGroup.invalid) {
      this.authFormGroup.markAllAsTouched();
    } else {
      const registrationRequest: RegistrationRequest = new RegistrationRequest();
      registrationRequest.firstName = this.firstname.value;
      registrationRequest.lastName = this.lastname.value;
      registrationRequest.email = this.email.value;
      registrationRequest.password = this.password.value;
      this.authService.customRegistrationAccount(registrationRequest).subscribe(
        data => {
          console.log(data);
          this.activeModal.dismiss('Cross click');
        });
    }
  }
}
