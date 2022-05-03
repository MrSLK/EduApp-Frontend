import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutersService {

  constructor() { }

  get_Current_Path(current_Path){
    let path ;
    let currentUrl;
    let temp;
    let path_length;


      currentUrl = window.location.href;
      path = window.location.href.search(current_Path);
      temp = currentUrl.slice(path);
      //Check location
      if(current_Path==="home"){
        path_length = temp.length - 1;
      }else {
        path_length = temp.length;
      }
  
      return localStorage.setItem("currentUrl",temp.substr(0,path_length));
  }
}
