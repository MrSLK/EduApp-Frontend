import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as e from 'express';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isLoggedIn: boolean = false;
  location = "";
  loc!: string;
  routerLink! : any;
  usertype!: string;
  wheretogo!: string;

  constructor(private router : Router) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("user_details")) {
      this.isLoggedIn = true;
     this.routerLink = sessionStorage.getItem("user_details");
     this.routerLink = JSON.parse(this.routerLink);
     this.usertype = this.routerLink.usertype;
     console.log(this.usertype)
     
    }
    if(localStorage.getItem("user_details")) {
      this.isLoggedIn = true;
      this.routerLink = sessionStorage.getItem("user_details")
      console.log(this.routerLink)
    }
    
  }

  clearSession(): void {
    sessionStorage.removeItem("user_details");
    localStorage.removeItem("user_details");
    
    Swal.fire({
      icon: 'error',
      text: 'Sad to see you go, Come back soon!',
      title: 'Logged Out'
    }).then((SweetAlertResult) =>{
        window.location.href = "/";
      }
    )
  }


  checkLocation(loc: string){
    this.location = loc;
  }

  dashboardLocation() : void {
    if(this.usertype == "admin") {
      // this.router.navigate(['/', 'admin-landing']);
      window.location.href = '/admin-landing';
      // this.router.navigate['bind']
    }
    else if(this.usertype == "teacher"){
      // this.router.navigate(['/', 'teacher-landing']);
      window.location.href = '/teacher-landing';
    }
    else if(this.usertype == "learner")
    {
      // this.router.navigate(['/', 'learner-landing']);
      window.location.href = '/learner-landing';
    }

  }

  Open(event: any){
    event.preventDefault()
    // GET THE SIDEBAR element
    let sideBar = document.querySelector('#sidebar-nav')
    // console.log(sideBar)

    let sideBar2 = sideBar

    if( sideBar2 != null ){
        sideBar?.classList.toggle('showSideBar')
        // console.log(sideBar)
    }
  }

  gotofunc(s: string) : void {
    sessionStorage.setItem('selector', JSON.stringify(s));
    if(this.isLoggedIn === true){
      window.location.href = `${this.usertype}-landing`
    }
    else{
      window.location.href = '/'
    }
  }

  // adminTabs(s: string): void
  // {
  //   sessionStorage.setItem('selector', JSON.stringify(s));
  // }

}


