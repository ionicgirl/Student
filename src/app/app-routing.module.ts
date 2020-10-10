import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { StudAttendanceComponent } from './stud-attendance/stud-attendance.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full',    
  
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule' ,

  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'stud_attendance',
    component: StudAttendanceComponent
  },
  {
    path: 'subject_details',
    component: SubjectDetailsComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
