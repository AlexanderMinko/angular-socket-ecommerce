import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialUser } from 'angularx-social-login';
import { LoginResponse } from '../model/dto/login-response';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = true;
  account: LoginResponse;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.accountChange.subscribe(
      data => this.account = data
    );
    this.authService.isLoggedChange.subscribe(
      data => this.isLogged = data
    );
    this.account = this.authService.getAccount();
    this.isLogged = !!this.account;
  }

  open() {
    this.modalService.open(LoginComponent,
      { size: 'lg', windowClass: 'modal-holder' });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
