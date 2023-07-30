import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

signupForm: FormGroup;

constructor(private commonService: CommonServiceService,private router: Router) {
    this.signupForm = new  FormGroup({
      // name : new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(6)])
    })
   }

   ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      // Call the userRegister() method from the service
      this.commonService.userRegister(this.signupForm.value).subscribe(
        (response) => {
          // Handle the successful response here
          Swal.fire('register Successfully!');
          this.router.navigate(['/login'])
          console.log("Registration successful", response);
        },
        (error) => {
          // Handle the error here
          console.error("Error occurred during registration", error);
        }
      );
    } else {
      console.log("Invalid form");
    }
  }

}
