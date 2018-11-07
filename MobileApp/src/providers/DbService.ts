import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbService {

  headers: Headers;
  baseurl: string = "";

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('X-Parse-Application-Id', "ATYIHGGRDOM672RLMWKH6FB01UU3LSXNUBCDF8LQ");
    this.headers.append('X-Parse-REST-API-Key', "EXK7FD21HEVRFRRZCXHPDFY536CGAIF5GP4Z5VGQ");
    this.headers.append('X-Parse-MASTER-Key', "P5Z7Q66LTQ98O1SDTPCGC8LSO0OAET9B9EL61645");
    this.headers.append('Content-Type', "application/json");

    // this.baseurl = "http://192.168.1.27:8500/parse/";
    this.baseurl = "http://localhost:8500/parse/";
  }


  /*
    *To make the user sign in with the application
    *@param: user_name - email
    *@param: password - password
    **/
  signIn(user_name, password) {
    return this.http.get(this.baseurl + 'login?username=' + user_name + '&password=' + password, {headers: this.headers})
      .map((resp: Response) => {
        return resp.json();
      })
      .do((data: any) => {
        return data;
      });
  }

  /*
    *To make the user sign up with the application
    *@param: user_name - first_name
    *@param: password - password
    *@param: email   - email
    **/
  signUp(user) {
    return this.http.post(this.baseurl + "users", user, {headers: this.headers})
      .map((resp: Response) => {
          return resp.json();
      });
  }

  getCurrentUser() {
      return JSON.parse(localStorage.getItem("current_user"));
  }

  setCurrentUser(data) {
    localStorage.setItem("current_user", JSON.stringify(data));
  }

  uploadImages(data) {
    return this.http.post(this.baseurl + 'functions/ImageUpload', data, {headers: this.headers})
      .map((resp: Response) => {
        return resp.json();
      });
  }

  getProjects(userObj) {
    return this.http.get(this.baseurl + 'classes/Project?where=' + JSON.stringify(userObj), {headers: this.headers})
      .map((resp: Response) => {
        return resp.json();
      });
  }

  saveProject(data) {
    return this.http.post(this.baseurl + 'classes/Project', data, {headers: this.headers})
      .map((resp: Response)=>{
        return resp.json();
      })
  }

  batchQuery(data) {
    return this.http.post(this.baseurl + 'batch', data, {headers: this.headers})
      .map((resp: Response)=>{
        return resp.json();
      })
  }

  getRapData(id) {
    var rapData = JSON.parse(localStorage.getItem('RapData'));
    id= id.toString();
    if(id && id.length > 0) {
      var temp_key = id.split('-');
      if(temp_key[0] == '1') {
        return rapData['Sheet'+temp_key[0]]['Table'+temp_key[1]];
      }else{
        return rapData['Sheet'+temp_key[0]];
      }
    }else{
      return rapData;
    }
  }

  setRapSheet(id, data) {
    var rapData = JSON.parse(localStorage.getItem('RapData'));
    id= id.toString();
    var temp_key = id.split('-');
    if(temp_key[0] == '1'){
      rapData['Sheet'+temp_key[0]]['Table'+temp_key[1]] = data;
    }
    else{
      rapData['Sheet'+temp_key[0]] = data;
    }
    localStorage.setItem('RapData',JSON.stringify(rapData));
  }

  getLocalJSON() {
    return this.http.post(this.baseurl + 'functions/LocalJSON', {}, {headers: this.headers})
      .map((resp: Response) => {
        return resp.json();
      });
  }

  saveData(dbName, data) {
    return this.http.post(this.baseurl + 'classes/'+ dbName, data, {headers: this.headers})
      .map((resp: Response) => {
        return resp.json();
      });
  }

}
