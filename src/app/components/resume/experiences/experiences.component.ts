import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as ExperienceActions from 'src/app/store/actions/experience.actions';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Experience } from 'src/app/store/models/experience.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent {
  expressions : Experience[] = [];
  experienceForm! : FormGroup;
  resumeId! : number;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(){
    this.store.dispatch(switchActiveTab( 'Experiences' ));
    this.store.pipe(select(selectResume)).subscribe(resume => {

      this.expressions = resume.experiences;
      this.resumeId = resume.id;
      this.experienceForm = this.formBuilder.group({
        id: [''],
        company: ['',Validators.required],
        title: ['',Validators.required],
        fromDate: ['',Validators.required],
        toDate: [''],
        description: [''],
        resumeId: [this.resumeId,Validators.required],
        });
    });
  }

  submitExperience(){
    if(this.experienceForm.valid){
      if(this.experienceForm.value.id === ''){
      const experience = this.experienceForm.value as Experience;
      this.store.dispatch(ExperienceActions.addExperience({experience}));
      }else{
        const experience = this.experienceForm.value as Experience;
        this.store.dispatch(ExperienceActions.updateExperience({experience}));
      }
    }else{
      this.experienceForm.markAllAsTouched();
    }
  }

  experienceFormReset(){
    this.experienceForm = this.formBuilder.group({
      id: [''],
      company: ['',Validators.required],
      title: ['',Validators.required],
      fromDate: ['',Validators.required],
      toDate: [''],
      description: [''],
      resumeId: [this.resumeId,Validators.required],
    });
  }

  editExperience(experience: Experience){
    this.experienceForm.patchValue({
      id: experience.id,
      company: experience.company,
      title: experience.title,
      fromDate: experience.fromDate ? formatDate(experience.fromDate, 'yyyy-MM-dd', 'en-US') : null,
      toDate: experience.toDate ? formatDate(experience.toDate, 'yyyy-MM-dd', 'en-US')  : null,
      description: experience.description,
      resumeId: this.resumeId
    });
  }

  deleteExperience(id: number){
    this.store.dispatch(ExperienceActions.deleteExperience({id}));
  }
}
