import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseURL = environment.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oneUser: any;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${baseURL}getAll`);
  }

  getAllTeachers() {
    return this.http.get(`${baseURL}getAllTeachers`);
  }

  getAllLearners() {
    return this.http.get(`${baseURL}getAllLearners`);
  }

  updateUserStatus(object : {}) {
    return this.http.put(`${baseURL}updateUserStatus`, object);
  }

  updateProfile(id : number, object : {}) {
    return this.http.put(`${baseURL}updateOne/${id}`, object)
  }

  //gets & sets 1 subject detail after being clicked
  setOneUser(data: any) {
    this.oneUser = data;
  }

  getOneUser() {
    return this.oneUser;
  }
}
