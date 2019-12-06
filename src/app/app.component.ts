import { AccountService } from './shared/account.service';
import { UserService } from './shared/user.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import {Plugins} from '@capacitor/core';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSlash = true;
  
  authenticate = false;
  public appPages = [
  
    {
      title: 'PLAY GAME',
      url: '/gamesection',
      icon: 'logo-game-controller-b'
    },
    {
      title: 'ACCOUNT',
      url: '/account',
      icon: 'wallet'
    },
    {
      title: 'LEADERBOARD',
      url: '/leaderboard',
      icon: 'trophy'
    },
    {
      title: 'PLAY DEMO',
      url: '/playdemo',
      icon: 'logo-game-controller-b'
    },
    {
      title: 'MY RECORD',
      url: '/myrecord',
      icon: 'list-box'
    },
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public userService: UserService,
    public accountService: AccountService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(5000).subscribe(()=> this.showSlash = false);
    });
  }
}
