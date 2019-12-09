import { GameServiceService } from './../shared/game-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.page.html',
  styleUrls: ['./admin-account.page.scss'],
})
export class AdminAccountPage implements OnInit {
 
  loading  = false;

  constructor(public gameService: GameServiceService) { 

  }

 model= {
   activate: '',
   date:'',
   youtubeUrl:''
 }

  ngOnInit() {
  }

  

  selectedDate(event){
    console.log(event);
  }

  submitDate(form : NgForm){
    console.log(form);
    console.log(this.model.date);
  }

  activateDate(){
    let adminDate = this.model.date;
    this.loading = true;
    
    this.gameService.setAdminDate(adminDate).subscribe(
      res => {
        this.loading = false;
        this.gameService.getAdminDate();
        window.location.reload();
      },
      err => {
        this.loading = false;
      }
    );

  }

  submityoutubeLink(link){
    this.loading = true;
    let body = {"link" : this.model.youtubeUrl};
    console.log(body);
    this.gameService.setYoutubeDate(body).subscribe(
        res => {
          this.loading = false;
          console.log(res);
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
  }



}
