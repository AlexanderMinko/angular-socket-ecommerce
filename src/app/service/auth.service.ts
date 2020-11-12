import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login"
import { BehaviorSubject, Observable } from 'rxjs';
import { SocialRequest } from '../model/social-request';
import { RegistrationRequest } from '../model/registration-request';
import { RegistrationResponse } from '../model/registration-response';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { RefreshTokenRequest } from '../model/refresh-token-request';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, tap } from 'rxjs/operators';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/api/auth';

  accountChange: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);
  isLoggedChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  customRegistrationAccount(registrationRequestDto: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationRequest>(`${this.baseUrl}/registration`, registrationRequestDto, headers);
  }

  google(socialRequest: SocialRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/google`, socialRequest, headers);
  }

  facebook(socialRequest: SocialRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/facebook`, socialRequest, headers);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest, headers).pipe(
      tap((data: LoginResponse) => {
        if (data.enabled) {
          this.isLoggedChange.next(true);
          this.accountChange.next(data);
          localStorage.removeItem('loginResponse');
          localStorage.setItem('loginResponse', JSON.stringify(data));
        } else {
          throw new Error('Please verificate your account!');
        }
      }));
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshTokenRequest: RefreshTokenRequest = new RefreshTokenRequest();
    refreshTokenRequest.email = this.getAccount()?.email;
    refreshTokenRequest.refreshToken = this.getAccount()?.refreshToken;
    return this.http.post<LoginResponse>(`${this.baseUrl}/refresh/token`, refreshTokenRequest).pipe(
      tap((data: LoginResponse) => {
        localStorage.removeItem('loginResponse');
        localStorage.setItem('loginResponse', JSON.stringify(data))
        console.log("REFRESH TOKEN WORKS");
      }));
  }

  logout() {
    const refreshTokenRequest: RefreshTokenRequest = new RefreshTokenRequest();
    refreshTokenRequest.refreshToken = this.getAccount().refreshToken;
    refreshTokenRequest.email = this.getAccount().email;
    this.http.post(`${this.baseUrl}/logout`, refreshTokenRequest, { responseType: 'text' }).subscribe(
      data => {
        console.log(data);
        this.isLoggedChange.next(false);
        this.accountChange.next(null);
        localStorage.removeItem('loginResponse');
      });
  }

  signInWithGoogle(activeModal: NgbActiveModal): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        const socialRequest: SocialRequest = new SocialRequest();
        socialRequest.firstName = data.firstName;
        socialRequest.lastName = data.lastName;
        socialRequest.token = data.idToken;
        socialRequest.photoUrl = data.photoUrl;
        this.google(socialRequest).subscribe((response: LoginResponse) => {
          this.accountChange.next(response);
          this.isLoggedChange.next(true);
          localStorage.removeItem('loginResponse');
          localStorage.setItem('loginResponse', JSON.stringify(response));
        }, error => {
          console.log(error);
          this.logout();
        }, () => {
          activeModal.dismiss('Cross click');
        });
      });
  }

  signInWithFB(activeModal: NgbActiveModal): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        const socialRequest: SocialRequest = new SocialRequest();
        socialRequest.firstName = data.firstName;
        socialRequest.lastName = data.lastName;
        socialRequest.token = data.authToken;
        socialRequest.photoUrl = data.response.picture.data.url;
        this.facebook(socialRequest).subscribe((response: LoginResponse) => {
          this.accountChange.next(response);
          this.isLoggedChange.next(true);
          localStorage.removeItem('loginResponse');
          localStorage.setItem('loginResponse', JSON.stringify(response));
        }, error => {
          console.log(error);
          this.logout();
        }, () => {
          activeModal.dismiss('Cross click');
        });
      });
  }

  getAccount() {
    return <LoginResponse>JSON.parse(localStorage.getItem('loginResponse'));
  }

}
