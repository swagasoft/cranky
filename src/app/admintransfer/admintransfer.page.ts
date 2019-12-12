import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-admintransfer',
  templateUrl: './admintransfer.page.html',
  styleUrls: ['./admintransfer.page.scss'],
})
export class AdmintransferPage implements OnInit {
manualTransfer : any;
loading: boolean = true;

  constructor(private accountService : AccountService) { 
    this.getManualList();
  }

  ngOnInit() { 
  }

  getManualList(){
    this.accountService.getManualTransactions().subscribe(
      res => {
        this.loading = false;
        this.manualTransfer = res['trans'];
        console.log(this.manualTransfer);
      }
    );
  }

  confirmUser(id){
    console.log(id);
    this.accountService.confirmTransaction(id).subscribe(
      res => {
        console.log(res);
      },err => {
        console.log(err);
      }
    )
    
  }

}
