import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const messaging = environment.messaging


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  objects: any;
  constructor(private http : HttpClient) { }

  sendToSpecificUser(object : {}) {
  return this.http.post(`${messaging}send-to-specific-user`, object);
  }

//Gets Messages between 2 specific users
getOneFromOne(object : {}) {
return this.http.get(`${messaging}dms`, object)
}

//Post in to a Group Chat
groupChat(object : {}) {
  return this.http.post(`${messaging}group-chat-post`, object)
}

//Gets from a specific group chat
getTopicsForSpecificSubject(id : number) {
  return this.http.get(`${messaging}group-chat-topics/${id}`)
}

//Gets posts from a specific group discussion
getPostsFromSpecificDiscussion(id : number){
  return this.http.get(`${messaging}get-posts/${id}`)
}

 postToSpecificDiscussion(object : {}) {
    return this.http.post(`${messaging}post-To-Specific-Discussion`, object)
  }

  getReplies(id : number)
  {
    console.log(id)
    return this.http.get(`${messaging}get-replies/${id}`)
  }

  makeReply(object: {}
    ){
    return this.http.post(`${messaging}reply`, object)
  }

  setOne(object: {}){
    this.objects = object;
  }

  getOne() {
    return this.objects;
  }
}
