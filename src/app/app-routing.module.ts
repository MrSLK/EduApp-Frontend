import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { LearnerLandingComponent } from './components/learner-landing/learner-landing.component';
import { TeacherLandingComponent } from './components/teacher-landing/teacher-landing.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { AdminAddSubjectComponent } from './components/admin-add-subject/admin-add-subject.component';
import { AdminCrudSubjectComponent } from './components/admin-crud-subject/admin-crud-subject.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { AdminUserCrudComponent } from './components/admin-user-crud/admin-user-crud.component';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import{LprofileComponent} from './components/lprofile/lprofile.component';
import { QuestionForSpeficQuestionComponent } from './components/question-for-spefic-question/question-for-spefic-question.component';
import { GroupChatsComponent } from './components/group-chats/group-chats.component';
import { TopicsComponent } from './components/topics/topics.component';
import { BookingComponent } from './components/booking/booking.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  {path: '', component: HomepageComponent ,pathMatch: 'full' },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'admin-landing', component: ViewAllComponent},
  {path: 'add-subject', component: AddSubjectComponent},
  {path: 'learner-landing', component: LearnerLandingComponent},
  {path: 'teacher-landing', component: TeacherLandingComponent},
  {path: 'admin-add-subject', component: AdminAddSubjectComponent},
  {path: 'subject-details', component: AdminCrudSubjectComponent},
  {path: 'admin-view-subject', component: AdminCrudSubjectComponent},
  {path: 'view-subjects', component: AdminLandingComponent},
  {path: 'user-status', component: AdminUserCrudComponent},
  {path: 'upload-documents', component: UploadDocumentComponent},
  {path:'profile',component:LprofileComponent},
  {path:'question-for-spefic-topics',component:QuestionForSpeficQuestionComponent},
  {path: 'group-discussion', component: GroupChatsComponent},
  {path: 'topics', component: TopicsComponent},
  {path: 'booking', component: BookingComponent}, 
  {path: 'Forgot-Password', component: PasswordComponent},
  {path: 'view-bookings', component: ViewBookingsComponent},
  {path: 'subject', component: AddSubjectComponent},
  {path: '', component: HomepageComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }