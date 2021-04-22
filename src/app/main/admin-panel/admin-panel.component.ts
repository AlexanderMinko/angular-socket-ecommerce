import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/entity/account';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  accounts: Account[] = [];

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAccounts()
    .subscribe(data => this.accounts = data);
  }

}
