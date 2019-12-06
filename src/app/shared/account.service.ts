import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public appUser :any;
  public accountBalance:Observable<number>;
  leaderboard$: Observable <any>;
  leaderboardGameSection$: Observable <any>;
  appUsername: any;


  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  AuthHeader = {headers: new HttpHeaders().set('Authorization',
  `Bearer ${localStorage.getItem('token')}`)};
  
    constructor(private http: HttpClient, private router: Router) {
     }

    loadMyBalance() {
      console.log('GETTING BALANCE');
      this.getLeaderGameSection();
      this.appUser = localStorage.getItem('appUser');
      this.http.get(environment.apiBaseUrl + '/get-account-balance').subscribe((value)=> {
        console.log(value);

        this.accountBalance = value['balance'];
        this.getLeaderboard();
        this.appUsername = localStorage.getItem('appUser');

      });
    }

    getLeaderboard() {
      this.getLeaderGameSection();
    this.http.get(environment.apiBaseUrl + '/get-leaderboard').subscribe((value)=> {
      this.leaderboard$ = value['document'];
      console.log(this.leaderboard$);
    });
    }

    getLeaderGameSection() {
    this.http.get(environment.apiBaseUrl + '/get-leaderboard-game-section').subscribe((value)=> {
      this.leaderboardGameSection$ = value['document'];

      console.log(this.leaderboardGameSection$);
    });
    }
   

    loadBalanceForCalculation(){
      this.loadMyBalance();
      return this.http.get(environment.apiBaseUrl + '/get-account-balance');
    }

    deductGameAmountFromAccount(){
      return this.http.get(environment.apiBaseUrl + '/deduct-game-amount');
    }

 

   
  
}