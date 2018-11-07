import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DbService } from '../../providers/DbService';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProjectEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-edit',
  templateUrl: 'project-edit.html',
})
export class ProjectEditPage {

  projectList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DbService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectEditPage');
  }

  ngOnInit() {
    var cur_user = this.dbService.getCurrentUser();
    var user_obj = {
      "user": {
        "__type":"Pointer",
        "className":"_User",
        "objectId": cur_user.objectId
      }
    };
    this.dbService.getProjects(user_obj).subscribe((resp)=>{
      console.log(resp);
      this.projectList = resp.results;
    },
    error => {
      if (error) {
        this.toastCtrl.create({
          message: 'Unable To Get Projects',
          duration: 1000
        }).present();
      }
    })
  }

  selectedProject(proj) {
    localStorage.setItem("project", JSON.stringify(proj));
    this.navCtrl.push(HomePage);
  }

}
