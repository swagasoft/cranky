import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  number: any;
  password: any;
  loading: boolean;

  constructor(public loadingController: LoadingController,
              private fb: FormBuilder,
              public alertController: AlertController,
              public toastController: ToastController,
              private router: Router, public userService: UserService) { 
    }

    model = {
      number: '',
      password: ''
    };

  ngOnInit() {
    this.loading = false;
  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
      duration: 2000
    });
    toast.present();
  }

  async login(form: any) {
    console.log('login fire')
    this.loading = true;
    this.userService.login(this.model).subscribe(response => {
      this.userService.setToken(response['token']);
      this.userService.loadBalance();
      localStorage.setItem('appUser',response['doc']['username']);
      localStorage.setItem('user-role',response['doc']['role']);
      this.loading = false;
      this.router.navigate(['/gamesection']);
   
        
    }, error => {
      this.loading = false;
      let message = error.error;
      console.log(error);
      this.loginToast(message);
    });
  }

  
  register() {
    this.router.navigate(['/register']);
  }

  facebook(){
    console.log('facebook login clicked');
  }

  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      header: 'Ooops!',
      message: ` <strong class="text-danger"> ${msg}</strong>`,
      buttons: [ {
          text: 'Try again',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();

  }

  async loginToast(message) {
    const toast = await this.toastController.create({
      header: 'Info ',
      message: `${message}`,
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'flash',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked'); 
          }
        }
      ]
    });
    toast.present();
  }

  facebookLogin(){
    let message = "currently not avalible!";
    this.loginToast(message);
  }

}
