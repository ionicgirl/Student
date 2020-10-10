import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';
import { ToastrModule } from 'ngx-toastr';



import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpConfigInterceptor } from './httpConfig.interceptor';
import { RegisterComponent } from './register/register.component';
import { StudAttendanceComponent } from './stud-attendance/stud-attendance.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
//import { ShowHidePasswordModule } from 'ngx-show-hide-password';
//import { } from '';

@NgModule({
  declarations: [AppComponent, ResetComponent, RegisterComponent, StudAttendanceComponent, SubjectDetailsComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule ,HttpClientModule ,ToastrModule.forRoot(), ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
  exports:[]
  

})
export class AppModule {

}
