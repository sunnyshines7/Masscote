import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioPage } from '../audio/audio';
import { VideoPage } from '../video/video';
import { AnalyticsPage } from '../analytics/analytics';
import { PhotosPage } from '../photos/photos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  photosPage: any = PhotosPage;
  audioPage: any = AudioPage;
  videoPage: any = VideoPage;
  analyticsPage: any = AnalyticsPage;

  constructor(public navCtrl: NavController) {

  }

  tapEvent(page: any) {
    this.navCtrl.push(page);
  }
}
