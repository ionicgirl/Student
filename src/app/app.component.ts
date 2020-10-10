import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from "rxjs/internal/Observable/timer";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  ShowSplash : boolean = true;
  public onlineOffline: boolean = navigator.onLine;
  constructor(
    private toastController: ToastController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
          navigator['app'].exitApp();                
      });
  });

  if(this.platform.is('android')) {
    this.statusBar.backgroundColorByHexString('#fff');
  }
    if (!navigator.onLine) {
     
      this.presentToastWithOptions("you are Offline");
  
      
      }
      else{
       this.presentToastWithOptions2("Online");
        
      }

     
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(1000).subscribe(()=> this.ShowSplash = false)
    });
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration:3000,
      color : "danger",
      keyboardClose : true,
      //translucent : true
    });
    toast.present();
  }

  async presentToastWithOptions2(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration:3000,
      color : "success",
      keyboardClose : true,
      //translucent : true
    });
    toast.present();
  }
  
  
}
