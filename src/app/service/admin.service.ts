import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/entity/account';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = 'http://localhost:8080/api/admin';

  constructor(
    private http: HttpClient
  ) { }

  getAccounts() {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

}
