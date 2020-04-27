import { GameServiceService } from './../shared/game-service.service';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private router: Router, private gameService: GameServiceService) { }

  ngOnInit() {
  }

  clickImoEvent(){
    this.router.navigate(['/imo-event']);
  }

  clickIsabiFans(){
      this.gameService.presentToast('comming soon!');
  }

  clickAwards(){
    this.gameService.presentToast("comming soon!");
  }



}
