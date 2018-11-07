import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DbService } from '../../providers/DbService';

/**
 * Generated class for the AnalyticDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-analytic-details',
  templateUrl: 'analytic-details.html',
})
export class AnalyticDetailsPage {

  page_id: any;
  page_name: any;
  analytics: any;
  project: any;
  RapData: any;
  cur_user: any;
  dbName: string;
  ex_currency: string = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DbService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyticDetailsPage');
  }

  ngOnInit() {

    this.page_id = this.navParams.get('page_id');
    this.page_name = this.navParams.get('page_name');
    this.project = JSON.parse(localStorage.getItem('project'));
    this.RapData = this.dbService.getRapData('');
    this.cur_user = this.dbService.getCurrentUser();
    var obj;
    if(this.page_id == '1-1') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table1';
    }

    if(this.page_id == '1-2'){
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table2';
    }

    if(this.page_id == '1-3'){
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table3';
    }

    if(this.page_id == '1-4') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table4';
    }

    if(this.page_id == '1-5') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table5';
    }
    if(this.page_id == '1-6') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table6';
    }
    if(this.page_id == '1-6b') {
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table6b';
    }
    if(this.page_id == '1-8') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table8';
    }

    if(this.page_id == '1-9') {
      this.analytics = [];
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Table9';
    }
    if(this.page_id == '4'){
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Sheet4';
    }
    if(this.page_id == '5'){
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Sheet5';
    }
    if(this.page_id == '6'){
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Sheet6';
    }
    if(this.page_id == '7'){
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Sheet7';
    }
    if(this.page_id == '11'){
      this.analytics = this.dbService.getRapData(this.page_id);
      this.dbName = 'Sheet11';
    }
    
  }

  toggleSection(data,type) {
    console.log(data);
    data.open = !data.open;
    if(type == 'add') {
      var obj = {
        "cropName": "Crop Name",
        "January": '0',
        "February":'0',
        "March":'0',
        "April": '0',
        "May": '0',
        "June": '0',
        "July": '0',
        "August": '0',
        "September": '0',
        "October": '0',
        "November": '0',
        "December": '0',
        "open": true
      };
      this.analytics.push(obj);
    }
    console.log(this.analytics)
  }

  saveToDB() {
    if(this.page_id == '1-6b' || this.page_id == '4' || this.page_id == '5' || this.page_id == '6' || this.page_id == '7' || this.page_id == '11'){
      this.singleSave();
    }else{
      this.batchSave();
    }
  }

  singleSave() {
    this.dbService.saveData(this.dbName, this.analytics)
      .subscribe((data: any) => {
        console.log(data);
        this.dbService.setRapSheet(this.page_id, this.analytics);
        this.navCtrl.pop();
      },
      error => {
        if (error) {
            this.alertCtrl.create({
                title: "Error while Saving please try again",
                message: error.json().error,
                buttons: ['OK']
            }).present();

        }
      }
    )
  }

  async batchSave() {
    let anal_data = {
      "requests": []
    };
    await this.analytics.forEach((data,i) => {
      var element = data;
      element['project'] = {
        "__type": "Pointer",
        "className": "Project",
        "objectId": this.project.objectId
      }
      element['user'] = {
        "__type": "Pointer",
        "className": "_User",
        "objectId": this.cur_user.objectId
      }
      //remove data and chage to specific
      if(this.page_id == '1-5' || this.page_id == '1-8' || this.page_id == '1-9') {
        element['table1'] ={
                "__type": "Pointer",
                "className": "Table1",
                "objectId": element.table1 ? element.table1.objectId : ''
              }
        if(this.page_id == '1-9'){
          element['ex_currency'] = this.ex_currency;
          element['table5'] ={
            "__type": "Pointer",
            "className": "Table5",
            "objectId": element.table5 ? element.table5.objectId : ''
          }
        } 

      }
      var temp = {
          "method": "POST",
          "path": "/parse/classes/" + this.dbName,
          "body": element,
        }
      
      anal_data.requests.push(temp);
    });

    console.log(anal_data);
    this.dbService.batchQuery(anal_data)
      .subscribe(async (resp) => {
        console.log(resp);

        await resp.forEach((ele,i) => {
          console.log(ele);
          console.log(i);
          this.analytics[i].objectId = ele.success.objectId;
          this.dbService.setRapSheet(this.page_id, this.analytics);


          if(this.page_id == '1-1'){
            var nin = []; 
            nin[i]={};
            nin[i] = {
              "table1" : this.analytics[i],
              "January": "0",
              "February":"0",
              "March":"0",
              "April": "0",
              "May": "0",
              "June": "0",
              "July": "0",
              "August": "0",
              "September": "0",
              "October": "0",
              "November": "0",
              "December": "0"
            }
            nin[0]["open"] = true;
            this.dbService.setRapSheet('1-8', nin);
            var t9 = [];
            t9[i] = {
              "table1": this.analytics[i],
              "typical_yield" : '0',
              "farmgate_sp": '0'
            };
            t9[0]["open"] = true;
            this.dbService.setRapSheet('1-9', t9);
            var t5 = this.dbService.getRapData('1-5');
            t5[0]["table1"] = this.analytics[i];
            nin = nin.concat(t5);
            this.dbService.setRapSheet('1-5', nin);
            
          }
          if(this.page_id == '1-5' && resp.length > i+1){
            var fif = this.dbService.getRapData('1-9');
            // fif[i] = {};
            fif[i]["table5"] = this.analytics[i]
            this.dbService.setRapSheet('1-9', fif);
          }
        });

        this.navCtrl.pop();
      },
      error => {
        if (error) {
          this.alertCtrl.create({
            title: "Upload Failed",
            message: error.json().error,
            buttons: ['OK']
          }).present();
        }
      }
    );
  }

  goBack() {
    this.navCtrl.pop();
  }

  calAnnual(index, evt) {
    if(this.page_id != '1-1' && this.page_id != '1-5' && this.page_id != '1-8'){
      this.analytics[index].Annual = (parseFloat(this.analytics[index].January) + parseFloat(this.analytics[index].February) + parseFloat(this.analytics[index].March) + 
                                      parseFloat(this.analytics[index].April) + parseFloat(this.analytics[index].May) + parseFloat(this.analytics[index].June) +
                                      parseFloat(this.analytics[index].July) + parseFloat(this.analytics[index].August) + parseFloat(this.analytics[index].September) +
                                      parseFloat(this.analytics[index].October) + parseFloat(this.analytics[index].November) + parseFloat(this.analytics[index].December)).toString();
      console.log(evt.target.name);
      if(this.page_id != '1-2'){
        this.calTotal(evt.target.name);
      }
    }
    if(this.page_id == '1-5') {
      this.calMax(index, evt);
    }
  }

  calTotal(name) {
    console.log(name);
    var len = 0;
    if(this.page_id == '1-6') {
      len = this.analytics.length-2;
      this.analytics[len][name.split(1)[0]] = '0';
      this.analytics[len+1][name.split(1)[0]] = '0';
      for(var i=0; i< len; i++){
        if(i<2){
          this.analytics[len+1][name.split(1)[0]] = (parseFloat(this.analytics[len+1][name.split(1)[0]]) + parseFloat(this.analytics[i][name])).toString();
          this.analytics[len+1].Annual = (parseFloat(this.analytics[len+1].January) + parseFloat(this.analytics[len+1].February) + parseFloat(this.analytics[len+1].March) + 
                                        parseFloat(this.analytics[len+1].April) + parseFloat(this.analytics[len+1].May) + parseFloat(this.analytics[len+1].June) +
                                        parseFloat(this.analytics[len+1].July) + parseFloat(this.analytics[len+1].August) + parseFloat(this.analytics[len+1].September) +
                                        parseFloat(this.analytics[len+1].October) + parseFloat(this.analytics[len+1].November) + parseFloat(this.analytics[len+1].December)).toString();
        }else{
          this.analytics[len][name.split(1)[0]] = (parseFloat(this.analytics[len][name.split(1)[0]]) + parseFloat(this.analytics[i][name])).toString();
          this.analytics[len].Annual = (parseFloat(this.analytics[len].January) + parseFloat(this.analytics[len].February) + parseFloat(this.analytics[len].March) + 
                                      parseFloat(this.analytics[len].April) + parseFloat(this.analytics[len].May) + parseFloat(this.analytics[len].June) +
                                      parseFloat(this.analytics[len].July) + parseFloat(this.analytics[len].August) + parseFloat(this.analytics[len].September) +
                                      parseFloat(this.analytics[len].October) + parseFloat(this.analytics[len].November) + parseFloat(this.analytics[len].December)).toString();
        }
      }
    }else{
      len = this.analytics.length-1;
      this.analytics[len][name.split(1)[0]] = '0';
      for(var j=0; j< len; j++){
        this.analytics[len][name.split(1)[0]] = (parseFloat(this.analytics[len][name.split(1)[0]]) + parseFloat(this.analytics[j][name])).toString();
      }
      this.analytics[len].Annual = (parseFloat(this.analytics[len].January) + parseFloat(this.analytics[len].February) + parseFloat(this.analytics[len].March) + 
                                      parseFloat(this.analytics[len].April) + parseFloat(this.analytics[len].May) + parseFloat(this.analytics[len].June) +
                                      parseFloat(this.analytics[len].July) + parseFloat(this.analytics[len].August) + parseFloat(this.analytics[len].September) +
                                      parseFloat(this.analytics[len].October) + parseFloat(this.analytics[len].November) + parseFloat(this.analytics[len].December)).toString();
    }
  }

  calMax(index, evt) {
    
    this.analytics[index].Annual = Math.max(parseFloat(this.analytics[index].January) , parseFloat(this.analytics[index].February) , parseFloat(this.analytics[index].March) , 
                                            parseFloat(this.analytics[index].April) , parseFloat(this.analytics[index].May) , parseFloat(this.analytics[index].June) ,
                                            parseFloat(this.analytics[index].July) , parseFloat(this.analytics[index].August) , parseFloat(this.analytics[index].September) ,
                                            parseFloat(this.analytics[index].October) , parseFloat(this.analytics[index].November) , parseFloat(this.analytics[index].December)).toString();
    this.calTotal(evt.target.name);
  }

  updateValue(e) {
    if(e.target.value == 0){
      e.target.value = ''
    }
  }

  isDisabled(i) {
    if(this.page_id == '1-6' && (i+1)>= 5){
      return true;
    }
    if(this.analytics.length == i+1 && (this.page_id != '1-1' && this.page_id != '1-2' && this.page_id != '1-8')){
      return true;
    }
    return false;
  }

  onModelValue(value, key) {
    console.log(value);
    if(value && key){
      this.analytics[key] = value;
    }
  }

}
