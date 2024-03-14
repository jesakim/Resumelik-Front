import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { PreviewComponent } from './components/resume/preview/preview.component';
import { ViewResumeComponent } from './components/public/view-resume/view-resume.component';

const routes: Routes = [
  { path: '', redirectTo:'resumes', pathMatch: 'full'},
  { path:'auth',component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
},
  { path:'resumes', component: ResumesComponent,canActivate:[authGuard]},
  { path:'resumes/:slug', component: ResumeComponent,canActivateChild:[authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'experiences', component: ExperiencesComponent },
      { path: 'educations', component: EducationsComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'languages', component: LanguagesComponent },
      { path: 'hobbies', component: HobbiesComponent },
    ]
  },
  {path:'resumes/:slug/preview',component:PreviewComponent,canActivate:[authGuard]},
  {path:'public/:slug',component:ViewResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
