import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RoutersService } from 'src/app/Services/routers.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  constructor(private formBuilder: FormBuilder, 
    private userService : UserService,
    private currentPath : RoutersService,
    private route:ActivatedRoute,
    private router:Router){}

  myForm!: FormGroup;
  submitted: boolean = false;
  userType!: string;
  myRes!: any;
  rememberMe!: boolean;

 


  ngOnInit(): void {
    this.currentPath.get_Current_Path("login");

    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    
  }
  

   // convenience getter for easy access to form fields
   get f() { 
     return this.myForm.controls; 
    }
    
  login(): void {
    this.submitted = true;

    let user = {
      username: this.myForm.value.username,
      password: this.myForm.value.password

      
    }
    console.log(user)
    this.userService.login(user).subscribe(res => {
      this.myRes = res;
      this.userType = this.myRes.usertype;
      console.log(this.myRes)


     

    

      
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: "Let's start working"
      }).then((SweetAlertResult) => {
        if(SweetAlertResult.value == true) {
          // window.location.href = `/${this.usertype}-landing`;
          console.log(`/${this.userType}-landing`);
          window.location.href = `/${this.userType}-landing`
          // this.router.navigate([`/`]);
          // this.routerF();
        }
      }); 

      sessionStorage.setItem('user_details', JSON.stringify(res));
      localStorage.setItem('username', JSON.stringify(this.myRes.email));
      sessionStorage.setItem('back', JSON.stringify('Back'));


    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error}`
      })
    });


  }

  emailCheck():void{
     this.userService.emailCheckUnique(this.myForm.value).subscribe(
       data=>{
       }
     )
  }

  async  routerF(){
    console.log("Router");
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/${this.userType}-landing`]);},0,1
      )
  
  }
}
