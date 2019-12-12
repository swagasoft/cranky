import { Component, OnInit, ViewChild } from '@angular/core';
import { GameServiceService } from '../shared/game-service.service';
import { UserService } from '../shared/user.service';
import { AlertController, ToastController, MenuController, IonSlides } from '@ionic/angular';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gamesection',
  templateUrl: './gamesection.page.html',
  styleUrls: ['./gamesection.page.scss'],
})
export class GamesectionPage implements OnInit {
  @ViewChild('mySlider', {static : false}) mySlider: IonSlides;
  appUser: any;
  low_balance :boolean = false;
  youtubeVideo: any;

  constructor(public gameService: GameServiceService,
              public userService: UserService,
              public alertController: AlertController,
              public toastController: ToastController,
              public accountService: AccountService,
              public menu: MenuController,
              protected sanitizer: DomSanitizer,
              private router: Router) {
          gameService.getYoutubeLink();
          this.loadBalance();
          gameService.getAdminDate();
     }



  ngOnInit() {
    this.appUser = localStorage.getItem('appUser');
    this.youtubeVideo = this.gameService.youtubeLink;


  }

  showVideo(){
    // return this.sanitizer.bypassSecurityTrustScript(this.gameService.youtubeLink);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.gameService.youtubeLink);
  }

  goToRecoreds(){
    this.router.navigate(['gamerecord']);
  }

  loadBalance() {
    this.accountService.loadMyBalance();
  } 

  makePayment(){
    this.router.navigate(['/account']);
  }

}
