import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  reference: any;
  title: any;
  appUsername: any;
  amountInput: any;
  exactAmount: any;


  constructor(private router: Router, public userService: UserService,
              public accountService: AccountService,
             ) {   

}

model = {
  amount:''
}

ngOnInit() {
  this.generateRef();
  this.appUsername = localStorage.getItem('appUser');
}

testWebview(){
 
}


paymentCancel(){
  this.amountInput = '';
  this.exactAmount = '';
  this.generateRef();
  // this.amountInput = null;
}

generateRef() {
  this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
}

paymentDone(process: any) {
  process.username = this.appUsername;
  process.amount = this.model.amount;

  this.userService.postTransaction(process).subscribe(
    res => {
     this.amountInput = '';
     this.exactAmount = '';
     this.accountService.loadMyBalance();
      
     this.generateRef();
    },
    err => {
     this.amountInput = '';
     this.exactAmount = '';
     this.generateRef();
     this.amountInput = null;
     this.accountService.loadMyBalance();
    }
  );
 
  console.log( process);
 }

 profileSection(){
  this.router.navigate(['/profile']);
}

 payNow(){
  console.log('pay now is clicked..');
  this.exactAmount = this.amountInput;
  this.amountInput = this.model.amount;
  const paymentAmount = this.amountInput + '00';
  this.amountInput = paymentAmount;
  console.log(this.exactAmount);
  console.log(this.amountInput);
}


} 
