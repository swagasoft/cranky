import { Component, OnInit, ViewChild } from '@angular/core';
import { GameServiceService } from '../shared/game-service.service';
import { UserService } from '../shared/user.service';
import { AlertController, ToastController, MenuController, IonSlides } from '@ionic/angular';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamesection',
  templateUrl: './gamesection.page.html',
  styleUrls: ['./gamesection.page.scss'],
})
export class GamesectionPage implements OnInit {
  @ViewChild('mySlider', {static : false}) mySlider: IonSlides;
  appUser: any;
  low_balance :boolean = false;

  constructor(public gameService: GameServiceService,
              public userService: UserService,
              public alertController: AlertController,
              public toastController: ToastController,
              public accountService: AccountService,
              public menu: MenuController,
              private router: Router) {
          // this.gameService.gameTimer();
          this.loadBalance();
     }



  ngOnInit() {
    this.appUser = localStorage.getItem('appUser');

       let xInt = setInterval(() => {
        this.mySlider.slideNext();
        }, 9000); 

  }


  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }

  goToRecoreds(){
    this.router.navigate(['gamerecord']);
  }

  
  startGame() {
    if (this.gameService.gameLive) {
      this.presentAlertConfirm();
    } else {
      console.log('not yet time!');
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: `CONTINUE TO GAME ?`,
      message: `<strong class="text-dark text-center"> You are about to start
       a game that will last <br> <h2 class="text-dark text-center"> 4 minutes</h2></strong>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancle game');
          }
        }, {
          text: 'Yes',
          cssClass: 'success',
          handler: () => {
            
            this.accountService.loadBalanceForCalculation().subscribe(
              res => {
                let UserBalance = res['balance'];
                if (UserBalance < 200){
                  this.low_balance = true;
                  setTimeout(()=> {
                    this.low_balance = false;
                  }, 6000);
                }else{

                  this.accountService.deductGameAmountFromAccount().subscribe(
                    res => {
                      this.accountService.loadMyBalance();
                      
                      this.router.navigate(['/playsection']);

                    },
                    error => {
                      console.log('ERROR');
                    }
                  );
                }
              }
            );
            
          }
        }
      ]
    });

    await alert.present();
  }

  loadBalance() {
    console.log('loading balance');
    this.accountService.loadMyBalance();
  } 

  makePayment(){
    this.router.navigate(['/account']);
  }

}
