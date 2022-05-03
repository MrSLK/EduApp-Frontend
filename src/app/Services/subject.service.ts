import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseURL = environment.assignSubject;
const baseURL1 = environment.subject;
const baseURL2 = environment.upload;


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  delete: any;

oneSubject: any;
  constructor(private http : HttpClient) { }

  //Assigned subjects urls
  assignSubject(subject : {}) : Observable<any> {
    return this.http.post(`${baseURL}addMySubject/`, subject);
  }

  removeMySubject(id: number) {
    return this.http.delete(`${baseURL}removeSubject/:${id}`);
  }

  viewMySubjects(id: number) {
    return this.http.get(`${baseURL}viewMySubjects/:${id}`);
  }

  //Subjects urls
  addSubject(subject : {}) {
    return this.http.post(`${baseURL1}addSubject`, subject);
  }

  deleteSubject(id: string) {
    return this.http.delete(`${baseURL1}deleteSubject/:${id}`);
  }

  updateSubject(body: {}, id: number) {
    return this.http.put(`${baseURL1}updateSubject/:${id}`, body);
  }

  viewAllSubject() {
    return this.http.get(`${baseURL1}getAllSubjects`);
  }  

  viewOneSubject(id: number) {
    return this.http.get(`${baseURL1}getOneSubject/:${id}`);
  }  

  //gets & sets 1 subject detail after being clicked
  setOneSubject(data: any) {
    this.oneSubject = data;
  }

  getOneSubject() {
    return this.oneSubject
  }
  //Upload docs
  uploadDocuments(file : FormData) {
    return this.http.post(`${baseURL2}upload-docs`, file);
  }

  //Gets all teachers
  getAllTeachers(id : number) {
    return this.http.get(`${baseURL}getTeachers/:${id}`)
  }

  getUsers(object: {}) {
    return this.http.post(`${baseURL}get-users`, object)
  }
}
