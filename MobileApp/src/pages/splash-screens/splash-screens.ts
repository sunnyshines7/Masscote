import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashScreensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash-screens',
  templateUrl: 'splash-screens.html',
})
export class SplashScreensPage {

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashScreensPage');
  }

  slideChanged() {
    let index = this.slides.getActiveIndex();
    if(index == this.slides.length() && this.slides.isEnd()) {
      this.goTo();
    }
  }

  goTo() {
    this.navCtrl.setRoot(LoginPage);
  }

}
