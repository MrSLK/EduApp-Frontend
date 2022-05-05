import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../Interfaces/users';
import { Login } from '../Interfaces/login';
import { Observable } from 'rxjs';

const baseURL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  emailCheckUnique: any;
  details(user: { firstname: any; lastname: any; email: any; cellphone: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  login(users : any): Observable<any> {
    return this.http.post(`${baseURL}login`, users);
  }

  signup(users : any, userType: string) {
    return this.http.post(`${baseURL}signup/${userType}`, users);
  }

  logout(users : any, userType: string) {
    localStorage.removeItem('username');
    return this.http.post(`${baseURL}logout/${userType}`, users);
  }
  update(users : any, userType: string) {
    return this.http.post(`${baseURL}update/${userType}`, users);
  }

  saveMyDocs(object : {}) {
    return this.http.post(`${baseURL}myDocs`, object);
  }

  getMyDocs(object : {}) {
    return this.http.post(`${baseURL}get-docs`, object)
  }

  forgotPassword(object : {}){
    return this.http.post(`${baseURL}forgot-password`, object);
  }

  updatePassword(object : {}) {
    return this.http.post(`${baseURL}update-password`, object);
  }
}
