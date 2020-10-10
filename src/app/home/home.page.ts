import { Component,OnDestroy, AfterViewInit } from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import {FormBuilder , Validators } from '@angular/forms';
import { ToastController, Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
  backButtonSubscription;
isLoading = false;

public loginForm: FormGroup;
  password: string = "password";
  passwordShow : boolean=false;
  passwordicon: string;



constructor(
  private platform : Platform,
 // public navCtrl : NavController,
  private userService: UserDataService,
  private router: Router,
  private toastController: ToastController,
  formBuilder: FormBuilder,

    )  {

     const storedEmail =  localStorage.getItem("email");
    // const storedMobile =  localStorage.getItem("mobile");
    // const storedRole =  localStorage.getItem("role");
    //  console.log(storedEmail);
     
      if(storedEmail !== undefined && storedEmail !== null){
        this.router.navigate(['stud_attendance']);
      }
      
          this.loginForm = formBuilder.group
          ({
             email: new FormControl('', Validators.compose
            ([
            Validators.required,
            // tslint:disable-next-line:max-line-length
            Validators.pattern('^.+@.+\\..+$')
            ])),

             password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

ngAfterViewInit(){
  this.backButtonSubscription = this.platform.backButton.subscribe(()=>{
    navigator['app'].exitApp();
  });
}    

ngOnDestroy(){

    this.backButtonSubscription.unsubscribe();
}

async presentToastWithOptions(message) {
      const toast = await this.toastController.create({
        message: message,
        position: 'bottom',
        duration:3000,
        keyboardClose : true,
        //translucent : true
      });
      toast.present();
    }

    async presentToastWithOptions2(message) {
      const toast = await this.toastController.create({
        message: message,
        position: 'bottom',
        duration:3000,
        keyboardClose : true,
        color : "success"
        //translucent : true
      });
      toast.present();
    } 
    
    
hideshowpassword(){
 this.password = this.password === 'password' ? 'text' : 'password';
  
 this.passwordicon = this.passwordicon === 'eye' ? 'eye-off' : 'eye';
}










login() {
//console.log(this.loginForm.valid);
if (this.loginForm.valid) {
  // e
    // console.log(this.loginForm.value);
    const data = {
          "email":this.loginForm.value.email,
          "password":this.loginForm.value.password,
          "role":"student",
          "acadyear":"2018-19"
        }
//try {
  this.userService.logintheStudent(data).subscribe((result : any)=>
          {
              if(result.success === 'false'){
                  this.presentToastWithOptions('Invalid email or password / user does not exist');
                }
              else if(result.success === 'true' ){
            
                  localStorage.setItem('email',result.email);
                  localStorage.setItem('mobile',result.mobile);
                  localStorage.setItem('role',result.role);
                  this.loginForm.controls['email'].setValue('');
                  this.loginForm.controls['password'].setValue('');
                  this.router.navigate(['stud_attendance']);
             }
         })
  


  }
else {

  this.presentToastWithOptions('email / password may be wrong please check again');
    }

}
} 


