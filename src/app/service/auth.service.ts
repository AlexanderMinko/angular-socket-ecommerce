import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login"
import { BehaviorSubject, Observable } from 'rxjs';
import { SocialRequestDto } from '../model/social-request-dto';
import { SocialResponseDto } from '../model/social-response-dto';
import { RegistrationRequestDto } from '../model/registration-request-dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/api/auth';

  socialUser: SocialUser;
  isLogged: boolean = false;
  accountChange: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null);
  isLoggedChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  customRegistrationAccount(registrationRequestDto: RegistrationRequestDto) {
    return this.http.post<RegistrationRequestDto>(`${this.baseUrl}/registration`, registrationRequestDto, headers);
  }

  google(socialRequestDto: SocialRequestDto): Observable<SocialResponseDto> {
    return this.http.post<SocialRequestDto>(`${this.baseUrl}/google`, socialRequestDto, headers);
  }

  facebook(socialRequestDto: SocialRequestDto): Observable<SocialResponseDto> {
    return this.http.post<SocialRequestDto>(`${this.baseUrl}/facebook`, socialRequestDto, headers);
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const socialRequestDto: SocialRequestDto = new SocialRequestDto(
          this.socialUser.idToken, this.socialUser.firstName, this.socialUser.lastName);
        this.google(socialRequestDto).subscribe(respose => {
          localStorage.setItem('socialToken', JSON.stringify(respose.token));
        }, error => {
          console.log(error);
          this.logOut();
        }, ()=> {
          this.proceedResult();
        });
      });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const socialRequestDto: SocialRequestDto = new SocialRequestDto(
          this.socialUser.authToken, this.socialUser.firstName, this.socialUser.lastName);
        this.facebook(socialRequestDto).subscribe(respose => {
          localStorage.setItem('socialToken', JSON.stringify(respose.token));
        }, error => {
          console.log(error);
          this.logOut();
        }, () => {
          this.proceedResult();
        });
      });
  }

  proceedResult(): void {
    console.log(this.socialUser);
    this.isLogged = !!this.socialUser;
    if (this.isLogged) {
      if (this.socialUser.provider === 'FACEBOOK') {
        this.socialUser.photoUrl = this.socialUser.response.picture.data.url;
      }
    }
    localStorage.setItem('account', JSON.stringify(this.socialUser));
    this.isLoggedChange.next(this.isLogged);
    this.accountChange.next(this.socialUser);
  }

  getAccount() {
    return JSON.parse(localStorage.getItem('account'));
  }

  getSocialToken() {
    return JSON.parse(localStorage.getItem('socialToken'));
  }

  logOut() {
    this.isLoggedChange.next(false);
    this.accountChange.next(null);
    localStorage.removeItem('account');
    localStorage.removeItem('socialToken');
  }
}
