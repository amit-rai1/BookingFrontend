import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { EvenOddComponent } from './even-odd/even-odd.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import 'ngx-toastr/toastr.css';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    EvenOddComponent,
    LoginComponent,
    UserDasboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
