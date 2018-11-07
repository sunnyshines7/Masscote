import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectEditPage } from '../project-edit/project-edit';
import { ProjectNewPage } from '../project-new/project-new';
import { DbService } from '../../providers/DbService';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  projectNew = ProjectNewPage;
  projectEdit = ProjectEditPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DbService) {
    
  }

  ionViewDidLoad() {
    this.dbService.getLocalJSON()
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('RapData',JSON.stringify(data.result))
    });

  }

}
