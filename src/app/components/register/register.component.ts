import { Component, OnInit, Input } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { UserService } from '../../Services/user.service';
import Swal from "sweetalert2"
import { RoutersService } from 'src/app/Services/routers.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  invalided = false;
  response!: any;
  errMessage: any;

  
  

  constructor(private formBuilder: FormBuilder, private userService : UserService ,private currentPath:RoutersService) { }

  ngOnInit() {
    this.currentPath.get_Current_Path("register");
    let created_at = Date.now()
    console.log(created_at);
      this.registerForm = this.formBuilder.group({
          userType: ['', Validators.required],
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['',[Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue],
          phone: ['', [Validators.required, Validators.pattern('(((0[6-8]))([0-9]{8}))')]],
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    let userType = this.registerForm.value.userType;
    let status = true;

    if(userType == "teacher"){
      status = false;
    }else{
      status = true;
    }
    
  let user = {
    full_name : this.registerForm.value.firstName + " " + this.registerForm.value.lastName,
    email: this.registerForm.value.email,
    cellno : this.registerForm.value.phone,
    status : status,
    password : this.registerForm.value.password,
  }

    if (this.registerForm.invalid) {
    }
    else{
      this.userService.signup(user, userType).subscribe(res => {
        this.response = res;
        console.log(res)
        sessionStorage.setItem("user_details", JSON.stringify(res))
        Swal.fire({
          icon: 'success',
          title: 'Registration Succes',
          text: "Registration Sucessfull. Let's start working"
        }).catch((SweetAlertResult) => {
          if(SweetAlertResult){
            if(userType == 'teacher'){
              window.location.href = '/upload-documents'
            } else if(userType == 'learner'){
              window.location.href = '/learner-landing'
            }
          }
        })
      }, err => {
        this.errMessage = err;
        console.log(this.errMessage.error )
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${this.response}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      })
    }
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    popUp() : void {
     
      Swal.fire({
        // icon: 'error',
        title: `T's & C's`,
        text: `If this Agreement conflicts with the TNC Agreement, this Agreement will prevail
        to such extent as this Agreement may be more favourable to the Writer.
        This Agreement will not be affected by any future amendment or expiry of the TNC
        Agreement, except that any increases to the financial terms payable under the TNC
        Agreement will apply to any payment due under this Agreement after the date of the
        increase. For the sake of clarity, the increase will not apply to payments that have
        already been made.
        This Agreement is in the form provided under the minimum terms of the TNC
        Agreement and any divergences from that form that are agreed between the parties
        are set out in Schedule 2 and/or listed by clause number in Schedule 2 for ease of
        reference.
        
         `,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  
}
