import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

 url: string;
  furl: string;

  private data:any;


  constructor(
    private client: HttpClient,
  ) {
    this.url = 'http://gescoeerp.in/api/';
    this.furl = 'http://gescoeerp.in/api/forgotpwd';

  }
  
  logintheStudent(data){
    //console.log(data);
    data['role'] = 'student';
    data['acadyear'] = '2018-19';
    const url = `${this.url}/login`;
    
    return this.client.post(url,data);

  }

  sendtheCode(userdata) {
   // console.log(userdata);
    userdata['role'] = 'student';
    return this.client.post(this.furl, userdata);
  }

  setpwd(userdata) {
    //console.log(userdata);
    userdata['role'] = 'student';
    return this.client.post(`${this.url}/passwordreset`, userdata);
  }

  
  getAttendance(opost):Observable<any>{
    // console.log(opost);
    
   return this.client.post<any>("http://gescoeerp.in/api/getattendancestudents",opost);
   
  }

  setData(data)
  {
    this.data =data;
  }

  getData(){
    return this.data;
  }

  sendCode(userdata) {
   // console.log(userdata);
    userdata['role'] = 'student';
    const url = `${this.url}/sendmail`;
    return this.client.post(url, userdata);
  }

  registerUser(userdata) {
   // console.log(userdata);
    userdata['role'] = 'student';
    const url = `${this.url}register`;
    return this.client.post(url, userdata);
  }

  loginStudent(data) {
    return this.client.post(
      this.url + 'onregister', data);
  }
}




