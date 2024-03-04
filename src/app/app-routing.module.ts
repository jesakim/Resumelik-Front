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

const routes: Routes = [
  { path:'resumes', component: ResumesComponent},
  { path:'resumes/:slug', component: ResumeComponent,
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
      { path: 'statistics', component: StatisticsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
