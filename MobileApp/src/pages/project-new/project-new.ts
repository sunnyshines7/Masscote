import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DbService } from '../../providers/DbService';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ProjectNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-new',
  templateUrl: 'project-new.html',
})
export class ProjectNewPage {

  cur_user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DbService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectNewPage');
  }
  
  ngOnInit() {
    this.cur_user = this.dbService.getCurrentUser();
  }

  saveProject(form: NgForm) {
    var proj_data = form.value;
    proj_data['user'] = {
      "__type": "Pointer",
      "className": "_User",
      "objectId": this.cur_user.objectId
    }

    console.log(proj_data);

    this.dbService.saveProject(proj_data)
      .subscribe((resp)=>{
        console.log(resp);
        proj_data['objectId'] = resp.objectId;
        localStorage.setItem("project", JSON.stringify(proj_data));
        this.navCtrl.push(HomePage);
      },
      error => {
        if (error) {
          this.alertCtrl.create({
            title: "Unable to save Project",
            message: error.json().error,
            buttons: ['OK']
          }).present();
        }
      }
    );
    
  }

}
