import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { AccountService } from 'src/app/shared/account.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';

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
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;


  constructor(private router: Router, public userService: UserService,
              public accountService: AccountService,
              public alertController: AlertController,
              public toastController: ToastController,
               public modalController: ModalController
             ) {   this.accountService.loadMyBalance();

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

mobileTransfer(){
  console.log(this.model.amount.valueOf());
  this.showAlert();


}

async showAlert() {
  const alert = await this.alertController.create({
    header: 'MOBILE TRANSFER',
    message: `After a successful transfer click OKAY.
             <p><h6 class=" font-weight-bold">Account Number: 3585745013</h6></p>
             <p><h6  class="font-weight-bold">Bank : FCMB </h6></p>
             <p><h6  class=" fiont-weight-bold">Account Name : Ayaweisoft </h6></p>
             <p> <h4 class=" fiont-weight-bold"> Amount : ₦ ${this.model.amount}</h4></p>`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('mobile transfer cancle');
          this.generateRef();
        }
      }, {
        text: 'Okay',
        handler: () => {
         
          let process = { username : this.appUsername , amount: this.model.amount, status : 'processing',
          trxref: this.reference, account_id: this.accountService.user_id, transaction : ' manual transfer'};
          process.username = this.appUsername;
          console.log('Confirm Okay', process);
          this.userService.postManualTransaction(process).subscribe(
            res => {
              console.log(res);
              this.presentSucess();
            },
            err => {
              console.log(err);
            }
          )
        }
      }
    ]
  });

  await alert.present();
}

async presentSucess() {
  const toast = await this.toastController.create({
    message: 'Your account will be updated shortly.',
    position: 'middle',
    duration: 4000
  });
  toast.present();
}


} 
