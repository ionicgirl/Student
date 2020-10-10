import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
//import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { DataService } from '../shared/services/data.service';



@Component({
  selector: 'app-stud-attendance',
  templateUrl: './stud-attendance.component.html',
  styleUrls: ['./stud-attendance.component.scss'],
})
export class StudAttendanceComponent implements OnInit {

 // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private _postservice:UserDataService,
    private router:Router,
    private dataService:UserDataService,
   // private httpclient : HttpClient 
    )
    {

    }
  
 
  mobile : string;

  email:string;

  objPosts:any;
  attendance:any[];
 
  users : any[];
   a : any[];
  ngOnInit(){
   
   const opost= {
    //  "mobile":"7448084798"
    mobile:localStorage.getItem('mobile'),
    email:localStorage.getItem('email'),


  }

    this._postservice.getAttendance(opost)
    .subscribe(
      (data)=>
    {
      // console.log(opost);
            this.objPosts = data;
            this.attendance = data.subject_wise_attendance;
            this.users = data.subject_wise_attendance;
            this.users = data.details;
      // this.a = data.details[0];
      // console.log(this.attendance);  
  })
  // this.httpclient
  //     .get("data-url")
  //     .subscribe((error:Response)=>{
  //       console.log(error);
  //       return Observable.throw(error);
  //     }
  //     );
    
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('mobile');
    localStorage.removeItem('role');

    this.router.navigate(['home']);
  }

  openDetails(data){
    
    this.dataService.setData(data);
    // console.log(data);
    this.router.navigate(['subject_details']);
    
  }

  loadMore(event) {
    setTimeout(() => {
     // console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      
    }, 500);
  }

}
