import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnalyticDetailsPage } from '../analytic-details/analytic-details';

/**
 * Generated class for the AnalyticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage {
    
    project:any;
    information: any = [
        {
            "name": "1. Input - Water Balance",
            "children": [
                {
                    "name": "Field Coefficients and Crop Threshold Ece",
                },
                {
                    "name": "Monthly ETo, mm",
                },
                {
                    "name": "Surface Water Entering Command Area Boundaries",
                },
                {
                    "name": "Internal Surface Irrigation Water Sources",
                },
                {
                    "name": "Hectares of Each Crop in the Command Area, by Month",
                },
                {
                    "name": "Groundwater Data",
                },
                {
                    "name": "Reality Check on Groundwater Storage and Recharge",
                },
                {
                    "name": "Precipitation, effective precipitation, and deep percolation of precipitation",
                },
                {
                    "name": "Special agronomic requirements",
                },
                {
                    "name": "Crop Yields and Values",
                }
            ]
        },
        {
            "name": "4. External Indicators",
        },
        {
            "name": "5. Project Office Questions",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "6. Project Employees",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "7. WUA",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "8. Main Canal",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "9. Second Level Canals",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "10.  Third Level Canals",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "11. Final deliveries",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "12. Internal Indicators",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "13. IPTRID Indicators",
            "children": [
                {
                    "name": "Table1",
                },
                {
                    "name": "Table2",
                },
                {
                    "name": "Table2",
                },
                {
                    "name": "Table2",
                },
            ]
        },
        {
            "name": "14. World Bank BMTI Indicators",
            "children": [
                {
                    "name": "WATER BALANCE INDICATORS",
                },
                {
                    "name": "FINANCIAL INDICATORS",
                },
                {
                    "name": "AGRICULTURAL PRODUCTIVITY AND ECONOMIC INDICATORS",
                },
                {
                    "name": "ENVIRONMENTAL INDICATORS",
                }
            ]
        }
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
      this.project = JSON.parse(localStorage.getItem('project'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyticsPage');
  }

  toggleSection(i, page_name) {
    i = i=='3' ? '0' : i;
    if(i == 0){
        this.information[i].open = !this.information[i].open;
    }else {
        this.navCtrl.push(AnalyticDetailsPage,{'page_id': i, "page_name": page_name});
    }  
  }

  goTo(page_id, page_name) {
    console.log(page_id);
    var ids = page_id.split('-');
    ids[0] = ids[0] == '3' ? '1' : ids[0];
    if(ids[0] == '1' && parseInt(ids[1]) > 6){
        ids[1] = (parseInt(ids[1])-1).toString();
        ids[1] = ids[1] == '6' ? '6b' : ids[1];
    }
    page_id = ids[0] + '-' + ids[1];
    if(ids[0] != '1'){
        page_id = ids[0];
    }
    console.log(page_id);
    this.navCtrl.push(AnalyticDetailsPage,{'page_id': page_id, "page_name": page_name});
  }

}
