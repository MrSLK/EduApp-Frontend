import { Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { RoutersService } from './Services/routers.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Frontend';
  
  isLoggedIn: boolean = false;
  loc!: string;
  routerLink! : any;
  usertype!: string;
  wheretogo!: string;

  currentUrl;
  sidebar = sessionStorage.getItem('user_details');
  back = sessionStorage.getItem('back');
  constructor(private location:Location ,private router:ActivatedRoute ,private currentPath:RoutersService){}
  ngOnInit(): void {
    this.loc = localStorage.getItem('currentUrl');

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

  dashboardLocation() : void {
    if(this.usertype == "admin") {
      window.location.href = '/admin-landing';
    }
    else if(this.usertype == "teacher"){
      window.location.href = '/teacher-landing';
    }
    else if(this.usertype == "learner")
    {
      window.location.href = '/learner-landing';
    }
  }
  
  goBack() {
    this.location.back();
  }

  status: boolean = true;
  clickEvent(){
      this.status = !this.status;       
  }

  //Side bar
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

  adminTabs(s: string): void
  {
    sessionStorage.setItem('selector', JSON.stringify(s));
  }

  clearOut() : void {
      sessionStorage.removeItem("user_details");
      localStorage.removeItem("user_details");
      
      Swal.fire({
        icon: 'error',
        text: 'Sad to see you go, Come back soon!',
        title: 'Logged Out'
      }).then((SweetAlertResult) => {
        if(SweetAlertResult.value === true){
          window.location.href = "/";
        }
        })
    }
}
