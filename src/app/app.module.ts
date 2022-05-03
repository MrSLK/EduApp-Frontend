import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { TeacherLandingComponent } from './components/teacher-landing/teacher-landing.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { LearnerLandingComponent } from './components/learner-landing/learner-landing.component';
import { AdminAddSubjectComponent } from './components/admin-add-subject/admin-add-subject.component';
import { AdminCrudSubjectComponent } from './components/admin-crud-subject/admin-crud-subject.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { AdminUserCrudComponent } from './components/admin-user-crud/admin-user-crud.component';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import { RouterModule } from '@angular/router';
import { LprofileComponent } from './components/lprofile/lprofile.component';
import { QuestionForSpeficQuestionComponent } from './components/question-for-spefic-question/question-for-spefic-question.component';
import { GroupChatsComponent } from './components/group-chats/group-chats.component';
import { TopicsComponent } from './components/topics/topics.component';
import { BookingComponent } from './components/booking/booking.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HomepageComponent,
    NavbarComponent,
    CarouselComponent,
    AdminLandingComponent,
    LearnerLandingComponent,
    TeacherLandingComponent,
    AddSubjectComponent,
    AdminAddSubjectComponent,
    AdminCrudSubjectComponent,
    ViewAllComponent,
    AdminUserCrudComponent,
    UploadDocumentComponent,
    AdminUserCrudComponent,
    ViewAllComponent,
    LprofileComponent,
    QuestionForSpeficQuestionComponent,
    GroupChatsComponent,
    TopicsComponent,
    BookingComponent,
    ViewBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // FormGroup,
    HttpClientModule,
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
