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
import { HttpClientModule } from '@angular/common/http';
import { ResumeEffects } from './store/effects/resume.effects';
import { resumeReducer } from './store/reducers/resume.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddResumeComponent } from './components/resumes/add-resume/add-resume.component';
import { NotificationsToastComponent } from './components/notifications-toast/notifications-toast.component';
import { failureReducer } from './store/reducers/failure.reducer';
import { sideBarReducer } from './store/reducers/side-bar.reducer';

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      resumeState: resumeReducer,
      failureState: failureReducer,
      sideBarState: sideBarReducer,
    }),
    EffectsModule.forRoot([ResumeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
