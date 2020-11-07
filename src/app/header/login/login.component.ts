import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationRequestDto } from '../../model/registration-request-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authFormGroup: FormGroup;
  isLoginMode: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get email() { return this.authFormGroup.get('email'); }
  get password() { return this.authFormGroup.get('password'); }
  get firstname() { return this.authFormGroup.get('firstname'); }
  get lastname() { return this.authFormGroup.get('lastname'); }

  onChangeToRegistration(): void {
    this.isLoginMode = false;
  }

  onSignInWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.activeModal.dismiss('Cross click');
  }

  onSignInWithFB(): void {
    this.authService.signInWithFB();
    this.activeModal.dismiss('Cross click');
  }

  onSubmit(): void {
    const registrationRequestDto: RegistrationRequestDto = new RegistrationRequestDto();
    registrationRequestDto.firstName = this.firstname.value;
    registrationRequestDto.lastName = this.lastname.value;
    registrationRequestDto.email = this.email.value;
    registrationRequestDto.password = this.password.value;
    this.authService.customRegistrationAccount(registrationRequestDto).subscribe(
      data => {
        console.log(data);
        this.activeModal.dismiss('Cross click');
      });
  }

}
