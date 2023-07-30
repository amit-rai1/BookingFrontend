import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { EvenOddComponent } from './even-odd/even-odd.component';
import { LoginComponent } from './login/login.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'', component:LoginComponent},

  {path:'signup', component:SignupComponent},
  {path:'evenodd', component:EvenOddComponent},
  {path:'login', component:LoginComponent},
  {path:'roomlist', component:UserDasboardComponent},
  {path:'adminlogin',component:AdminLoginComponent},
  {path:'admindashboard',component:AdminDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
