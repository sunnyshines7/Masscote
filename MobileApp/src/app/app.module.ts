import { HTTP } from '@ionic-native/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { AudioPage } from '../pages/audio/audio';
import { VideoPage } from '../pages/video/video';
import { PhotosPage } from '../pages/photos/photos';
import { LoginPage } from '../pages/login/login';
import { AnalyticDetailsPage } from '../pages/analytic-details/analytic-details';
import { SplashScreensPage } from '../pages/splash-screens/splash-screens';
import { DbService } from '../providers/DbService';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectsPage } from '../pages/projects/projects';
import { ProjectNewPage } from '../pages/project-new/project-new';
import { ProjectEditPage } from '../pages/project-edit/project-edit';
import { ChildViewComponent } from '../components/child-view/child-view';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProjectsPage,
    ProjectNewPage,
    ProjectEditPage,
    HomePage,
    AnalyticsPage,
    AudioPage,
    VideoPage,
    PhotosPage,
    AnalyticDetailsPage,
    SplashScreensPage,
    ChildViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProjectsPage,
    ProjectNewPage,
    ProjectEditPage,
    HomePage,
    AnalyticsPage,
    AudioPage,
    VideoPage,
    PhotosPage,
    AnalyticDetailsPage,
    SplashScreensPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbService
  ]
})
export class AppModule {}
