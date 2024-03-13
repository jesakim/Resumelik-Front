import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResumesComponent } from './components/resumes/resumes.component';
import { ResumeComponent } from './components/resume/resume.component';
import { OverviewComponent } from './components/resume/overview/overview.component';
import { ContactsComponent } from './components/resume/contacts/contacts.component';
import { AddressesComponent } from './components/resume/addresses/addresses.component';
import { ExperiencesComponent } from './components/resume/experiences/experiences.component';
import { EducationsComponent } from './components/resume/educations/educations.component';
import { SkillsComponent } from './components/resume/skills/skills.component';
import { ProjectsComponent } from './components/resume/projects/projects.component';
import { CertificatesComponent } from './components/resume/certificates/certificates.component';
import { LanguagesComponent } from './components/resume/languages/languages.component';
import { HobbiesComponent } from './components/resume/hobbies/hobbies.component';
import { StatisticsComponent } from './components/resume/statistics/statistics.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SideBarComponent } from './components/resume/side-bar/side-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResumeEffects } from './store/effects/resume.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AddResumeComponent } from './components/resumes/add-resume/add-resume.component';
import { NotificationsToastComponent } from './components/notifications-toast/notifications-toast.component';
import { ContactEffects } from './store/effects/contact.effects';
import { AddressEffect } from './store/effects/address.effects';
import { ExperienceEffect } from './store/effects/experience.effects';
import { EducationEffect } from './store/effects/education.effects';
import { SkillEffect } from './store/effects/skill.effects';
import { ProjectEffects } from './store/effects/project.effects';
import { CertificateEffects } from './store/effects/certificate.effects';
import { LanguageEffects } from './store/effects/language.effects';
import { HobbyEffects } from './store/effects/hobby.effects';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthEffect } from './store/effects/auth.effects';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { failureReducer } from './store/reducers/failure.reducer';
import { resumeReducer } from './store/reducers/resume.reducer';
import { authReducer } from './store/reducers/auth.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ResumesComponent,
    ResumeComponent,
    OverviewComponent,
    ContactsComponent,
    AddressesComponent,
    ExperiencesComponent,
    EducationsComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificatesComponent,
    LanguagesComponent,
    HobbiesComponent,
    StatisticsComponent,
    SideBarComponent,
    AddResumeComponent,
    NotificationsToastComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      resumeState: resumeReducer,
      failureState: failureReducer,
      authState: authReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
      ResumeEffects,
      ContactEffects,
      AddressEffect,
      ExperienceEffect,
      EducationEffect,
      SkillEffect,
      ProjectEffects,
      CertificateEffects,
      LanguageEffects,
      HobbyEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
