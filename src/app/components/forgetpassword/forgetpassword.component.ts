import { UserService } from 'src/app/shared/user.service';
import { AccountService } from './../../shared/account.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})


export class ForgetpasswordComponent implements OnInit {

  showPasswordEdit: boolean = false;
  showNumberForm: boolean  = true;
  showOTPInput: boolean = false;
  confirmOTP : boolean = false;
  otpFromServer: any;
  userOtpInput: any = 0;
  loading: boolean = false;

  // noAuthHeader = headers: new HttpHeaders({NoAuth: 'True'});


   header = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin','*');
 
  constructor(private accountService: AccountService,
              private http: HttpClient,
              private userService: UserService) { 


  }

 

  model = {
    number:''
  }

  ngOnInit() {

  }


  submitNumber(form: NgForm) {
    this.loading = true;
    console.log(this.model.number);
    this.userService.confirmNumber(this.model.number).subscribe(
      res => {
        this.loading = false;
        this.otpFromServer = res['otp'];
        console.log(this.otpFromServer);
        this.showNumberForm = false;
        this.sentOTPtoUser();
        this.showOTPInput = true;
      },
      err => {
        this.loading = false; 
        console.log(err.error);
      }
    );
 
  }

  onOtpChange(otp){
      // console.log(otp);
      this.userOtpInput = this.userOtpInput + otp;
      console.log(this.userOtpInput);
  }

  sentOTPtoUser(){
    const smsEmail = 'ayaweisoft@gmail.com';
    const smsApi = '320bf56fb1683682fef15e4285d52b7861c293ba';
    const smSsender = 'I-SABI'; 
    let numberString = this.model.number.toString();
    let code ='234'; 
    let recipient = code+numberString;
    let messageText = `Use the folowing OTP to reset your password${this.otpFromServer}`;
  
    // tslint:disable-next-line: max-line-length
    this.http.get(`http://api.ebulksms.com:8080/sendsms?${smsEmail}=&apikey=${smsApi}&sender=${smSsender}&${messageText}&flash=0&recipients=${recipient}`
  ,{headers: new HttpHeaders({
    "Content-Type":  "application/json","Access-Control-Allow-Origin":"*"
  })
}).subscribe(
    res => { 
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
  }

}
