import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(private commonService: CommonServiceService,private router: Router) {
    this.LoginForm = new FormGroup({
      // name : new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.LoginForm.valid) {
      // console.log("Form valid:", this.signupForm.valid);
      
      this.commonService.users(this.LoginForm.value).subscribe(
        (response) => {
          Swal.fire('Success', 'Login successful!', 'success');
          console.log("Login successful", response);
        this.router.navigate(['/roomlist'])

        },
        (error) => {
          Swal.fire('Error', 'Error occurred during login.', 'error');
          console.error("Error occurred during login", error);
        }
      );
    } else {
      Swal.fire('Error', 'Invalid form', 'error');
      console.log("Invalid form");
    }
  }


}
