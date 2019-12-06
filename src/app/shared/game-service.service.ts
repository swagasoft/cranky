import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var NetworkInterface: any;

@Injectable({
  providedIn: 'root'
})
export class GameServiceService  {
  gameNotLive: boolean = true;
  public gameLive: boolean = false;
  public timeDays: any;
  public timeHours: any;
  public timeMinute: any;
  public timeSeconds: any; 
  arrayLengthTips : any;
  gameTipArray: Observable<any>;
  public applicationDate: any;

  
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  AuthHeader = {headers: new HttpHeaders().set('Authorization',
  `Bearer ${localStorage.getItem('token')}`)};
  
  constructor(private http: HttpClient) {
    this.getAdminDate();
    this.getGameTip();


   }

  //  jan 10,2019 06:00:00
   // timer
   gameTimer() {
     let appDATE = this.applicationDate;
     console.log('DATABASE TIME',appDATE);
     let deadline = new Date(appDATE).getTime();
    
     let x = setInterval(()=> {
    let now = new Date().getTime();
    let t = deadline - now;
    this.timeDays = Math.floor(t / (1000 * 60 * 60 * 24)).toString();
    this.timeHours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    this.timeMinute = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
    this.timeSeconds = Math.floor((t % (1000 * 60)) / 1000).toString();
    
    if (t < 0) {
      this.gameLive = true;
      this.gameNotLive = false;
      clearInterval(x);
      this.timeDays = '0';
      this.timeHours = '0';
      this.timeMinute = '0';
      this.timeSeconds = '0';
   
          }
          // this.gameLive = false;
    }, 1000);
      }


  getGameTip(){
    this.http.get(environment.apiBaseUrl + '/game-fun-fact-tips').subscribe((tips)=> {
      this.gameTipArray = tips['gamestips'];
      this.arrayLengthTips = tips['gamestips'].length;
      console.log(this.arrayLengthTips);
      console.log(this.gameTipArray);
    });
   
  }


  setAdminDate(date) {
    return this.http.get(environment.apiBaseUrl + `/submit-admin-date${date}`);
  }
  getAdminDate() {
    return this.http.get(environment.apiBaseUrl + '/get-admin-date').subscribe(
      res=>{
        this.applicationDate = res['doc']['appdate'];
        console.log('start time');
        setTimeout(()=> {
          this.gameTimer();
        },2000);
      }
    );
  }

      
}




