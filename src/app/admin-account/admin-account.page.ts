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
   date:''
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
    console.log('activate date', adminDate);
this.loading = true;
    
    this.gameService.setAdminDate(adminDate).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.gameService.getAdminDate();
        window.location.reload();
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );

  }



}
