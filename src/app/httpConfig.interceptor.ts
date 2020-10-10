//httpConfig.interceptor.ts
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError, retry } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { LoadingController } from '@ionic/angular';
  //import { Toast } from '@ionic-native/toast/ngx';
  import { ToastController } from '@ionic/angular';


  //import 'rxjs/add/operator/do';

  
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    loaderToShow: any;
    flag:boolean;
    //toastrService: any;
    constructor(
      private toastController: ToastController,
        public loadingController : LoadingController,
        //private toast:Toast
    ) { }

  

  
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token = "my-token-string-from-server";
  
      //Authentication by setting header with token value
      if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
      }
  
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }
  
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });

      this.showLoader("");
      
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse)
          {
          //  console.log('event--->>>', event);
            this.hideLoader();
          }
          this.hideLoader();
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
             let errorMessage = 'Server Not found';
            // console.log(error);
             if(error.name === "HttpErrorResponse")
             {
              // window.alert("Server not found");
             this.presentToastWithOptions('server not found');           
             //this.toastrService.error('everything is broken', 'Major Error', {
             // timeOut: 3000,
           /// });
             }
             
            
         
            this.hideLoader();
            return throwError(errorMessage);
             
           }),
           
        );

     
     
 
    }

    async presentToastWithOptions(message) {
      const toast = await this.toastController.create({
        message: message,
        //showCloseButton: true,
        position: 'bottom',
        color:'danger',
        duration: 3000
      });
      toast.present();
    }
  
  
  
    showLoader(message) {
        this.loaderToShow = this.loadingController.create({
          message: message
        }).then((res) => {
          res.present();
          this.hideLoader();

          res.onDidDismiss().then((dis) => {
           // console.log('Loading dismissed!');
            this.hideLoader();
          })
          .catch(()=>{

          });
        });
      }
     
      hideLoader() {
          this.loadingController.dismiss().catch(()=>{});
      }   
  
     
     
    }

  