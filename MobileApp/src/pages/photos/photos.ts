import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { DbService } from '../../providers/DbService';
import { HomePage } from '../home/home';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {

  uploadImagesList: any = [];
  removedImageList: any = [];
  displayImageList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public imagePicker: ImagePicker, public dbService: DbService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }

  ngOnInit() {
    // Images from server
    this.displayImageList = [];
  }

  OnAddImage() {

    const options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 25,
        correctOrientation: true,
        saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.uploadImagesList.push(imageData);
      this.displayImageList.push(imageData);
      
    }, (err) => {
        //alert(err)
    });
  }

  onAddMultiImages() {
    const options = {
        quality: 25,
        outputType: 1,
        maximumImagesCount: 20
    }
    this.imagePicker.getPictures(options).then((imageData) => {
      // Adding images array and save to thread
      console.log(imageData);
      this.uploadImagesList = this.uploadImagesList.concat(imageData);
      this.displayImageList = this.displayImageList.concat(imageData);

    }, (err) => { });
  }

  uploadimage() {
    var obj = {
      "upload" : this.uploadImagesList,
      "delete" : this.removedImageList,
      "objectId" : "mwX7lyxjuk" 
    }

    this.dbService.uploadImages(obj)
      .subscribe((data) => {
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        if (error) {
          this.alertCtrl.create({
            title: "Upload Failed",
            message: error.json().error,
            buttons: ['OK']
          }).present();
        }
      });
  }

  removeImages(data,index) {
    var servercount = this.displayImageList.length - this.uploadImagesList.length
    if(servercount < index){
      var i = index - servercount;
      this.uploadImagesList = this.uploadImagesList.splice(i,1)
    }else{
      this.removedImageList.push(data)
    }
    this.displayImageList = this.displayImageList.splice(index,1);
  }

  goBack() {
    this.navCtrl.pop();
  }


}
