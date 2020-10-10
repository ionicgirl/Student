import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss'],
})
export class SubjectDetailsComponent implements OnInit {

  subjectdetails:any;
  constructor(private dataService:UserDataService,private httpclient : HttpClient) { 
    
    this.subjectdetails =  this.dataService.getData()
   
  }
  ngOnInit() {}

}
