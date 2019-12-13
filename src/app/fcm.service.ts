import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularFire2/firestore';
import { Platform } from '@ionic/angular';
import { async } from 'q';
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  // constructor(public firebaseNative : Firebase ,
  //             public afs : AngularFirestore,
  //             private platform : Platform) { }

  //             async getToken(){
  //               let token;
  //               if(this.platform.is('android')){
  //                 token = await this.firebaseNative.getToken();
  //               }

  //               if(this.platform.is('ios')){
  //                 token = await this.firebaseNative.getToken();
  //               const perm = await this.firebaseNative.grantPermission();
  //               }

  //               return this.saveTokenToFirestore(token);
  //             }

  //             private saveTokenToFirestore(token){
  //               if (!token) return;
  //               const deviceRef = this.afs.collection('devices');

  //               const docData =  { 
  //                 token ,
  //                 userId : 'testUser'
  //               }

  //               return deviceRef.doc(token).set(docData);
  //             }

  //             listenToNotifications(){
  //               return this.firebaseNative.onNotificationOpen();
  //             }


}


