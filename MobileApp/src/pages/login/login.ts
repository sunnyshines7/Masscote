import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { DbService } from '../../providers/DbService';
import { ProjectsPage } from '../projects/projects';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formType = 'login';

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbServices: DbService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  changeForm(type) {
    this.formType = type;
  }

  onSignIn(form: NgForm) {
    // this.navCtrl.setRoot( ProjectsPage );

    if(this.formType == 'login'){
      this.dbServices.signIn(form.value.email_id,form.value.auth)
        .subscribe((data: any) => {
          console.log(data);
          localStorage.auth = 'loggedIn';
          this.dbServices.setCurrentUser(data);
          this.navCtrl.setRoot(ProjectsPage);
        },
        error => {
          if (error) {
              this.alertCtrl.create({
                  title: "Login Failed",
                  message: error.json().error,
                  buttons: ['OK']
              }).present();

          }
        }
      )
    }
    if(this.formType == 'register') {
      const user = {
        "name":form.value.name,
        "username":form.value.email_id,
        "password":form.value.auth
      }
      this.dbServices.signUp(user)
        .subscribe((data: any) => {
          console.log(data);
          localStorage.auth = 'loggedIn';
          delete user['password'];
          data = Object.assign(user, data);
          this.dbServices.setCurrentUser(data);
          this.navCtrl.setRoot( ProjectsPage );
        },
        error => {
          if (error) {
            this.alertCtrl.create({
              title: "Register Failed",
              message: error.json().error,
              buttons: ['OK']
            }).present();
          }
        }
      )
    }    
  }

}
