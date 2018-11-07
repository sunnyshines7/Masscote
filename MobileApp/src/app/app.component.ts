import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PhotosPage } from '../pages/photos/photos';
import { AudioPage } from '../pages/audio/audio';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { AnalyticDetailsPage } from '../pages/analytic-details/analytic-details';
import { SplashScreensPage } from '../pages/splash-screens/splash-screens';
import { ProjectsPage } from '../pages/projects/projects';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AnalyticsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.setRootPage();
    });
  }

  async setRootPage() {
    if(localStorage){
      var auth = localStorage.auth;
      if( auth && auth =='loggedIn' ) {
        this.rootPage = ProjectsPage;
      } else {
        this.rootPage = SplashScreensPage;
      }
    } else{
      this.rootPage = SplashScreensPage;
    }
  }

}

