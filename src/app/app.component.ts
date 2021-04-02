import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { Plugins, StatusBarStyle  } from "@capacitor/core";
import { AuthService } from './modules/auth/auth.service';
import { timer } from 'rxjs';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  splash: boolean = true


  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
  ) {

    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // this.statusBar.styleDefault();
  //     // this.splashScreen.hide();
  //   });
  // }

  async initializeApp(){
    const { SplashScreen , StatusBar } = Plugins;
    try{
      await StatusBar.setStyle({ style: StatusBarStyle.Light});
      // console.log(JSON.stringify(StatusBar.getInfo()) );
       
      // if (this.platform.is('android')){
        await StatusBar.setStyle({ style: StatusBarStyle.Light });
        await SplashScreen.hide();
        timer(4000).subscribe(()=> this.splash= false)
        await StatusBar.setBackgroundColor({ color: '#FFE20D'});

      // }
      

      
    }catch ( err ){
      console.log('Normal en browser', err);
      timer(4000).subscribe(()=> this.splash= false)
    }

    this.darkMode()
  }


  ////////DARK THEME
  darkMode(){
      // Use matchMedia to check the user preference
      document.body.classList.toggle('dark', false);
  }

}
