import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-playsection',
  templateUrl: './playsection.page.html',
  styleUrls: ['./playsection.page.scss'], 
})
export class PlaysectionPage implements OnInit {
  gameQuestions: any[];
   
    lastQuestion : any;
    currentQuestion: any;
    startGame = false;
    progress: any;
    correcQuestion  = 0;
    wrongQuestion = 0
     runningQuestion : any;
     timeMinute: any = 0;
    timeSeconds: any = 0;
    loadingGame = false;
    correctAns: any = 0;
    gameOver : boolean;
    wrongAns: any = 0;
    low_balance = false;

    GameTimeMinute: any = 0;
  GameTimeSeconds: any = 0;
    


  constructor(private userService: UserService,
              public accountService: AccountService,
              private router: Router) {
    this.getQuestionForGame();
    this.runningQuestion = 0;
 
  }



  ngOnInit() {
    console.log(this.gameOver)

  }

  getQuestionForGame() {
    this.loadingGame = true;
    this.userService.getRandomQuestionsForGame().subscribe(
      res => {
        this.gameQuestions = res['questions'];
        this.lastQuestion =  this.gameQuestions.length -1;
        this.loadingGame = false
        console.log(this.gameQuestions);
      },
      err => {
        console.log(err);
      }
    );
  }


  gameisOver(){
    this.GameTimeMinute = this.timeMinute;
    this.GameTimeSeconds = this.timeSeconds;
    this.gameOver = true;
    this.loadingGame = true;
    this.startGame = false;
    
    const minutes = ( 3 - this.timeMinute );
    const seconds = (60 - this.timeSeconds );
    let correct_qst = this.correctAns;
    let wrong_qst = this.wrongAns;
    
    const record = {minutes , seconds, correct_qst, wrong_qst};
    console.log( minutes, seconds);
    this.userService.postQuestionRecord(record).subscribe(
        res => {
          this.loadingGame = true;
          console.log('RESPONSE');
          setTimeout(()=> {
            this.loadingGame = false;
            this.gameOver = undefined;
            this.startGame = undefined; 
            this.correctAns = 0;
            this.wrongAns = 0;
            this.router.navigate(['/gamesection']);
            
          }, 10000);
        }
      );
    }

 

  checkAnswer(selection, correctAnswer) {
      if (selection === correctAnswer){
        this.correctAns = this.correctAns + 1;
          } else {
        this.wrongAns = this.wrongAns + 1;
        }
      this.nextQuestion();
  }

  startQuestion() {

    this.loadingGame = true;
    this.accountService.loadBalanceForCalculation().subscribe(
      res => {
        let UserBalance = res['balance'];
       
        if (UserBalance < 200){
          this.low_balance = true;
          setTimeout(()=> {
            this.low_balance = false;
          }, 7000);
          this.loadingGame = false;
        }else{

          this.accountService.deductGameAmountFromAccount().subscribe(
            res => {
              this.accountService.loadMyBalance();
              
              this.startGame = true;
              this.currentQuestion  = this.gameQuestions[this.runningQuestion];
              this.startTimer();
              this.loadingGame = false;

            },
            error => {console.log('ERROR'); }
          );
        }
      },
      err => {
        console.error(err);
        this.loadingGame = false;
      }
    );

  }


  renderQuestion() {
  this.startGame = true;
  this.currentQuestion  = this.gameQuestions[this.runningQuestion];
  }

 

  nextQuestion(){
    if( this.runningQuestion  < this.lastQuestion  ) {
      this.runningQuestion ++;
      this.renderQuestion();
    }else{
      this.startGame = false;
      this.gameisOver();
      console.log('no more questionsssss');
    
    }
  }
  

  renderProgress() {
    for(let qIndex = 0; qIndex <= this.lastQuestion; qIndex++ ) {
      this.progress = qIndex;
      console.log('progress', this.progress);
    } 
  }

  startTimer() {
    // COUNTDOWN IN SECONDS
   // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
   let counter = 240;
   // Start if not past end date
   if (counter > 0) {
     const ticker = setInterval(() => {
       // Stop if passed end time
       counter--;
       if (counter <= 0 || this.gameOver) {
         clearInterval(ticker);
         this.gameisOver();
         counter = 0;
        
       }
 
       let secs = counter;
       const mins  = Math.floor(secs / 60); // 1 min = 60 secs
       secs -= mins * 60;
       this.timeMinute = mins;
       this.timeSeconds = secs;
       console.log(secs);

       if(this.gameOver){
        console.warn('i have to clear the interval...');
        clearInterval(ticker);
       }else{
         console.warn('not yet time...');
       }
 
     }, 1000);
   }
 }

 gameOverToleaderboard(){
   this.gameOver = undefined;
   this.correctAns = 0;
   this.wrongAns = 0;
   this.router.navigate(['/leaderboard']);
 }
 gameOverToRecords(){
   this.gameOver = undefined;
   this.correctAns = 0;
   this.wrongAns = 0;
   this.router.navigate(['/myrecord']);
 }

  // renderCounter(){
  //   let count;
  //   const QuestionTime = 10; 
  //   const guageWidth =  150;
  //   let timeGuage;
  //   const guageUnit =  guageWidth / QuestionTime;
  //   if (count <= QuestionTime){
  //     timeGuage.styleWidht = count * guageUnit;
  //     count ++;
  //   }else{
  //       count = 0;
  //   }
  // }
}
