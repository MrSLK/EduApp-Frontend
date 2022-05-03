import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-crud',
  templateUrl: './admin-user-crud.component.html',
  styleUrls: ['./admin-user-crud.component.scss']
})
export class AdminUserCrudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  form!: FormGroup;
  oneUser!: User;
  full_name!: any;
  cellno!: any;
  created_at!: any;
  email!: any;
  id!: any;
  status!: any;
  updated_at!: any;
  usertype!: any;
  resMessage!: any;

  ngOnInit(): void {

    this.form = new FormGroup({
      user_status: new FormControl('')
    });

    this.oneUser = this.authService.getOneUser();
    
    this.full_name = this.oneUser.full_name;
    this.cellno = this.oneUser.cellno;
    this.created_at = this.oneUser.created_at;
    this.email = this.oneUser.email;
    this.id = this.oneUser.id;
    this.status = this.oneUser.status;
    this.updated_at = this.oneUser.updated_at;
    this.usertype = this.oneUser.usertype;

    
  }


  checkFormValue() : void {
    let formV = this.form.value;
    console.log(formV);
    console.log(this.id);

    let user = {
      user_id: this.id,
      user_status: this.form.value.user_status
  
  };

  console.log(user)
    this.authService.updateUserStatus(user).subscribe(res => {
      this.resMessage = res;
      Swal.fire({
        icon: 'success',
        title: 'User updated',
        text: `${this.resMessage}`
      })
      window.location.href = '/view-users'
    }, err => {
      console.log("Didn't update user status")
    })
  }

}


