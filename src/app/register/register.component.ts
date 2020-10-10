import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import {FormBuilder , Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
//import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  isLoading = false;
  public RegisterForm: FormGroup;
  aftercodesend: boolean;

  
  constructor(
    private userService: UserDataService,
    private router: Router,
    //private httpclient : HttpClient,
    public toastController: ToastController,
    public formBuilder: FormBuilder
      ) {
      
        this.aftercodesend = false;
            this.RegisterForm = formBuilder.group
            ({
               email: new FormControl('', Validators.compose
              ([
              Validators.required,
              // tslint:disable-next-line:max-line-length
              Validators.pattern('^.+@.+\\..+$')
              ])),
  
               password: ['', [Validators.required, Validators.minLength(8)]],
               code: ['', [ Validators.maxLength(6)]]
  
          });
      }
  
  
  async presentToastWithOptions(message) {
        const toast = await this.toastController.create({
          message:message,
          position: 'bottom',
          duration : 3000,
        });
        toast.present();
      }
  
  
  
sendcode() {
    console.log(this.RegisterForm.valid);
    if (this.RegisterForm.valid) {
      // e
      console.log(this.RegisterForm.value);
      const data = {
        'email' : this.RegisterForm.value.email,
        'password' : this.RegisterForm.value.password
      };
    
      this.userService.sendCode(data).subscribe((result: any) => {
         console.log(result);
        if (result.success === 'true') {
          this.aftercodesend  = true;
         
        }  
        else{
          this.presentToastWithOptions("User Already Exists!");

        }      
      })
      // this.httpclient
      // .get("data-url")
      // .subscribe((error:Response)=>{
      //   console.log(error);
      //   return Observable.throw(error);
      // }
      // );
    
    } else {
    // no error
      this.presentToastWithOptions('Email / Password error');
    }
    
  }


onregister() {
  
    if ( this.RegisterForm.value.code === undefined) {
      this.presentToastWithOptions('Enter correct code');
      return;
    }
    if (this.RegisterForm.valid) {
      // e
      // console.log(this.RegisterForm.value);
      const data = {
        'email' : this.RegisterForm.value.email,
        'password' : this.RegisterForm.value.password,
       
        'code': this.RegisterForm.value.code
      };
    
      this.userService.registerUser(data).subscribe((result: any) => {
        // console.log(result);
        if (result.success === 'true') {
          this.aftercodesend  = true;
          this.presentToastWithOptions('Successfully Registered');
          this.router.navigate(['/login']);
        }
      })
      // this.httpclient
      // .get("data-url")
      // .subscribe((error:Response)=>{
      //   console.log(error);
      //   return Observable.throw(error);
      // }
      // );
    
    
    
    } else {
    // no error
    }


  
  }
  ngOnInit() {}


}
 


