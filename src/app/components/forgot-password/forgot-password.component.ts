import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  myForm!: FormGroup;
  form!: FormGroup;
  user_details!: any;
  isLoggedIn!: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      email: new FormControl('')
    });

    this.form = new FormGroup({
      new_password: new FormControl('')
    })

    this.user_details = sessionStorage.getItem('user_details');
    this.user_details = JSON.parse(this.user_details) //This takes a JSON string and converts it to an object

    if(this.user_details != null) {
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }
  }

  submit() : void {
    console.log(this.myForm.value);

    this.userService.forgotPassword(this.myForm.value).subscribe(data => {
      console.log(data);

      Swal.fire({
        icon: 'success',
        title: 'Password Reset',
        text: 'Successfully Reset Your Password, please check your email'
      }).then((SweetAlertResult) => {
        if(SweetAlertResult){
          window.location.href = '/login'
        }
      })
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error.......',
        text: 'Email not found'
      }).catch((SweetAlertResult) => {
        if(SweetAlertResult){
          window.location.href = '/forgot-password'
        }
      })
    })

  }

  updatePassword() : void {

    console.log()
    console.log()

    let object = {
      newPassword: this.user_details.id,
      id: this.form.value.new_password
    }

    this.userService.updatePassword(object).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Password Update',
        text: 'Password updated successfully'
      }).then((SweetAlertResult) => {
        if(SweetAlertResult){
          window.location.href = `/${this.user_details.usertype}-landing`
        }
      })
    })


  }

}
