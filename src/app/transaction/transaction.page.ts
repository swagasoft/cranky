import { AccountService } from 'src/app/shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
loading: boolean = true;
transaction: any;

  constructor(private accountService : AccountService) { }
 
  ngOnInit() {
this.getTransaction();
  }


  getTransaction(){
    console.log('fire trans');
    this.accountService.myTransaction().subscribe(
      res => {
        this.loading = false;
        this.transaction = res['transaction'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
