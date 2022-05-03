import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseURL = environment.chats;

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  getAllChats(id: number): Observable<any> {
    console.log(id);
    return this.http.get(`${baseURL}${id}`);
  }

  sendChats(message: any): Observable<any> {
    return this.http.post(`${baseURL}`, message);
  }
}
