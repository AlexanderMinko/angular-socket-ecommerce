import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/header/login/login.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  token: string;
  message: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(()=> {
      this.token = this.activatedRoute.snapshot.params.token;
      console.log(this.token);
      this.verificateAccount();
    });
  }

  verificateAccount() {
    this.authService.verificateAccount(this.token)
    .subscribe(data => {
      this.message = data;
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigateByUrl('/verification/' + this.message)
    });
  }

  open() {
    this.modalService.open(LoginComponent,
      { size: 'lg', windowClass: 'modal-holder' });
  }

}
