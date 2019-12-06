import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {


  constructor(  public menu: MenuController,
                private userService: UserService,
                private router: Router,
                public toastController: ToastController,
                public accountServive: AccountService) {
      this.accountServive.getLeaderboard(); 
   
     }


  ngOnInit() {
  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }
  gotoGame(){
    this.router.navigate(['gamesection']);
  }

}
