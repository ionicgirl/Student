import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  isLoading = false;
  public restForm: FormGroup;
  aftercodesend :boolean; 
  password: string = "password";
  passwordShow : boolean=false;
  passwordicon: string;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserDataService,
    private toastController: ToastController,
    private router: Router,
    private httpclient : HttpClient
   
  ) {
    this.aftercodesend = false; 
    {      
      this.restForm = formBuilder.group
      ({
         email: new FormControl('', Validators.compose
        ([
        Validators.required,
        // tslint:disable-next-line:max-line-length
        Validators.pattern('^.+@.+\\..+$')
        ])),

        password: ['',[Validators.minLength(8)]],
        code: ['', [ Validators.maxLength(6)]]
    });
}

   }



  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      //showCloseButton: true,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }


   ngOnInit() {
    
  }

     
hideshowpassword(){
  this.password = this.password === 'password' ? 'text' : 'password';
   
  this.passwordicon = this.passwordicon === 'eye' ? 'eye-off' : 'eye';
 }
 

  resetpwd(){

    // console.log(this.restForm.valid);
    if ( this.restForm.value.code === undefined) {
      this.presentToastWithOptions("Enter correct code");
      return;
    }
    if ( this.restForm.value.password === undefined) {
      this.presentToastWithOptions("Enter password");
      return;
    }
    if (this.restForm.valid) {
      // e
      // console.log(this.restForm.value);
      const data = {
        'emailmobile' : this.restForm.value.email,
        'code' : this.restForm.value.code,
        'role' : 'student',
        'pwd' : this.restForm.value.password, 

      };
    
      this.userService.setpwd(data).subscribe((result: any) => {
        // console.log(result);
        if(result.success === 'false'){
          this.presentToastWithOptions("please check code!");
        }
      else if (result.success === 'true') {
        this.presentToastWithOptions("New password is set");

        this.router.navigate(['home']);
        }
      })
      // this.httpclient
      // .get("data-url")
      // .subscribe((error:Response)=>{
      //   console.log(error);
      //   return Observable.throw(error);
      // }
      // );
   

  }
}



sendcode() {

  // console.log(this.restForm.valid);
  if(!(this.restForm.value.email))
    {
      this.presentToastWithOptions(" Email is required !");
    }
  if (this.restForm.valid) {
    // e
    // console.log(this.restForm.value);
    const data = {
      'emailmobile' : this.restForm.value.email,
      'role' : 'student'
    };
  
    this.userService.sendtheCode(data).subscribe((result: any) => {
      // console.log(result);
      if(result.success === 'false'){
        this.presentToastWithOptions("Invalid Email!!");
      }
    else if (result.success === 'true') {
        this.aftercodesend  = true;
      }
    })
    // this.httpclient
    //   .get("data-url")
    //   .subscribe((error:Response)=>{
    //     console.log(error);
    //     return Observable.throw(error);
    //   }
    //   );
    

  

  }
}
}
