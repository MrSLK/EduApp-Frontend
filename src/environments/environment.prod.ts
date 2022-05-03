
// const baseUrl = 'https://api.eduinc.thedigitalacademy.co.za'

// export const environment = {
//   production: true,
//   BASEURL : baseUrl
// };
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//-------------------------------Heroku_URLs-------------------------------
// const BaseUrl = 'https://edu-incpg.herokuapp.com/user/';
// const assignedSubject = 'https://edu-incpg.herokuapp.com/assignedSubject/';
// const Subject = 'https://edu-incpg.herokuapp.com/subject/';
// const authentication = 'https://edu-incpg.herokuapp.com/auth/';
// const docUpload = 'https://edu-incpg.herokuapp.com/upload/';
// const messaging = 'https://edu-incpg.herokuapp.com/messaging/';
// const booking = 'https://edu-incpg.herokuapp.com/booking/';
// const chats = 'https://edu-incpg.herokuapp.com/chats/'
// const socketEndpoint = 'https://edu-incpg.herokuapp.com/';
// const rooms = 'https://edu-incpg.herokuapp.com/rooms/';
//-------------------------------Localhost_Urls----------------------------
const BaseUrl = 'http://localhost:4310/user/';
const assignedSubject = 'http://localhost:4310/assignedSubject/';
const Subject = 'http://localhost:4310/subject/';
const authentication = 'http://localhost:4310/auth/';
const docUpload = 'http://localhost:4310/upload/';
const socketEndpoint = 'http://localhost:43200/';
const messaging = 'http://localhost:4310/messaging/';
const booking = 'http://localhost:4310/booking/';
const chats = 'http://localhost:4320/chats/';

export const environment = {
  production: false,
  baseUrl : `${BaseUrl}`,
  assignSubject : `${assignedSubject}`,
  subject : `${Subject}`,
  auth : `${authentication}`,
  upload : `${docUpload}`,
  SOCKET_ENDPOINT: `${socketEndpoint}`,
  messaging : `${messaging}`,
  booking : `${booking}`,
  chats : `${chats}`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
