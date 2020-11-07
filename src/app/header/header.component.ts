import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = true;
  userLogged: SocialUser;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.accountChange.subscribe(
      data => this.userLogged = data
    );
    this.authService.isLoggedChange.subscribe(
      data => this.isLogged = data
    );
    this.userLogged = this.authService.getAccount();
    this.isLogged = !!this.userLogged;
  }

  open() {
    this.modalService.open(LoginComponent,
      { size: 'lg', windowClass: 'modal-holder' });
  }

  signOut() {
    this.authService.logOut();
  }

}
