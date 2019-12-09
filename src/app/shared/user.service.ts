import { Observable } from 'rxjs';
import { AccountService } from 'src/app/shared/account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  accountBalance: any;
  username: any;
  networkDisconnet = false;

  
noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};



constructor(private http: HttpClient,
            private network: Network,
            private accountService: AccountService,
            private router: Router) {
              

    this.network.onDisconnect().subscribe(()=> {
      console.log('CONNETION LOST');
      this.networkDisconnet = true;
    });

    this.network.onConnect().subscribe(()=> {
      setTimeout(()=> {
        console.log(' WE ARE BACK IN CONNECTION');
        this.networkDisconnet = false;
      });
    });

    }

    registerUser( user) {
      return this.http.post(environment.apiBaseUrl + '/register' , user, this.noAuthHeader);
    }

    // password reset
    confirmNumber(number){
      return this.http.get(environment.apiBaseUrl + `/confirm-user-number${number}`, this.noAuthHeader);
    }
    confirmOTP(otp) {
      return this.http.get(environment.apiBaseUrl + `/confirm-user-otp${otp}`, this.noAuthHeader);
    }
  
    postQuestion(question){
      return this.http.get(environment.apiBaseUrl + `/post-question${question}`);
    }
  
    getAllQuestions(){
      return this.http.get(environment.apiBaseUrl + '/get-all-questions');
    }

    login(credentials) {
      return this.http.post(environment.apiBaseUrl  + '/login',
       credentials, this.noAuthHeader);
    }
  
    // Random tips on Random
    getRandomTips(){
      return this.http.get(environment.apiBaseUrl + '/get-random-tip');
    }
    findByCategory(category){
      return this.http.get(environment.apiBaseUrl + `/find-by-category${category}`, );
    }
   

    changeQuestionStatusToFalse(id){
      return this.http.get(environment.apiBaseUrl + `/change-to-false${id}`);
    }
    changeQuestionStatusToTrue(id){
      return this.http.get(environment.apiBaseUrl + `/change-to-true${id}`);
    }
    getSingleQuestion(id){
      return this.http.get(environment.apiBaseUrl + `/get-single-question${id}`);
    }
  
    upDateQuestion(question){
      return this.http.post(environment.apiBaseUrl + `/update-question`, question);
    }
    deleteQuestion(id){
      console.log(id);
      return this.http.get(environment.apiBaseUrl + `/delete-question${id}`);
    }
    postTransaction(tranx){
      return this.http.post(environment.apiBaseUrl + `/submit-transaction`, tranx);
    }
    loadBalance(){
      this.accountService.getLeaderGameSection();
      return this.http.get(environment.apiBaseUrl + '/load-balance');
    }
  
    saveUserProfile(credentials){
      return this.http.post(environment.apiBaseUrl + '/save-user-profile',credentials);
    }

    getUserProfile(): Observable<any> {
      return this.http.get(environment.apiBaseUrl + '/get-user-profile');
    }
  
    getRandomQuestionsForGame(){
      this.accountService.getLeaderGameSection();
      return this.http.get(environment.apiBaseUrl + '/get-random-questions-for-game');
    }
  
    getUserRole(){
      return localStorage.getItem('user-role');
     }
  
     postQuestionRecord( record){
       return this.http.post(environment.apiBaseUrl +'/post-game-record', record);
     }
     getGameRecord(){
       return this.http.get(environment.apiBaseUrl + '/get-game-record');
     }
  
     deleteGameRecord(id){
       return this.http.get(environment.apiBaseUrl + `/delete-game-record${id}`);
     }
  
   
     setToken(token: string) {
      localStorage.setItem('token', token);
   
     }
     deleteToken() {
       window.localStorage.removeItem('token');
     }
   
     public getToken(): string {
     this.token = localStorage.getItem('token');
     return this.token;
     }
  
   
     getUserPayload() {
       const token = this.getToken();
       if (token) {
         const userPayload = atob(token.split('.')[1]);
         return JSON.parse(userPayload);
       } else {
         return null;
       }
     }
   
     isLogedIn() {
       const userPayload = this.getUserPayload();
       if (userPayload) {
       return userPayload.exp > Date.now() / 1000;
       } else {
       return false;
       }
     }
     public logout(): void {
      this.deleteToken();
      this.token = '';
      this.username = '';
      this.accountBalance = '';
      localStorage.removeItem('appUser');
      this.router.navigateByUrl('/login');
     }
  
   
}
