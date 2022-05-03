import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lprofile',
  templateUrl: './lprofile.component.html',
  styleUrls: ['./lprofile.component.scss']
})
export class LprofileComponent implements OnInit {
  myForm!: FormGroup;
  user_details!: any;
  status: boolean = true;
  full_names!: any;
  phone!: any;
  email!: any;
  id!: any;
  message!: any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService : AuthService) { }
 
  ngOnInit() {

    this.user_details = sessionStorage.getItem('user_details');
    this.user_details = JSON.parse(this.user_details) //This takes a JSON string and converts it to an object
    this.id = this.user_details.id
    console.log(this.user_details)

    this.full_names = this.user_details.full_names;
    this.phone = this.user_details.phone;
    this.email = this.user_details.username;


    //initializing varables
    this.myForm = new FormGroup({
      name: new FormControl(this.full_names),
      email: new FormControl(this.email),
      phone: new FormControl(this.phone)
    });
  }

  changeType() : void {
    this.status = false

  }

  submit() : void {
    let object = this.myForm.value
    console.log(object)

    this.authService.updateProfile(this.id, object).subscribe(data => {
      this.message = data;

      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: `${this.message}`
      }).then((SweetAlertResult) => {
        if(SweetAlertResult.value == true) {
          
          this.router.navigate([`/`]);
          this.routerF();
        }
      });  
    }, err => {
      console.log(err)
    })

  }

  async  routerF(){
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/profile`]);},0,1
      )
  
  }

}
