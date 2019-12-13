import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AdminGuard } from './auth/admin.guard';
import { AccountComponent } from './components/account/account.component';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { Facebook , FacebookOriginal} from '@ionic-native/facebook';
import { Facebook } from '@ionic-native/facebook/ngx';
import {AngularFireModule} from 'angularFire2';
import {AngularFirestoreModule} from 'angularFire2/firestore';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Angular4PaystackModule } from 'angular4-paystack';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
import { AuthguardGuard } from './auth/authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AccountService } from './shared/account.service';
import { GameServiceService } from './shared/game-service.service';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { GamePipe } from './game.pipe';
import { from } from 'rxjs';

const firebase = {
  apiKey : "AIzaSyCkayajnRPdP1d_HsPOQxIq5sMNYZKLaTY ",
  authDomain : "i-sabi-773b4.firebaseapp.com",
  databaseUrl : "https://i-sabi-773b4.firebaseio.com",
  projectId  : "i-sabi-773b4",
  storageBucket : "i-sabi-773b4.appspot.com",
  messagingSenderId : "76166240437"

}

@NgModule({
  declarations: [AppComponent, AdminAccountComponent,
    GamePipe, AccountComponent, ForgetpasswordComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    Angular4PaystackModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  
  providers: [{provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor, multi: true},
    StatusBar,
  
    SplashScreen,
    StatusBar,
    UserService,
    Network,
    // NativeAudio,
    Angular4PaystackModule,
    SplashScreen,
    AuthguardGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    UserService, AccountService,AdminGuard,  Facebook,
     AuthguardGuard, GameServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
