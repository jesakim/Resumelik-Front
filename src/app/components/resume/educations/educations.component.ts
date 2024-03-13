import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Education } from 'src/app/store/models/education.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as EducationActions from 'src/app/store/actions/education.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent {
  educations! : Education[];
  educationForm! : FormGroup;
  resumeId! : number;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(){
    this.store.dispatch(switchActiveTab('Educations' ));
      this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.educations = resume.educations;
      this.educationForm = this.formBuilder.group({
        id : [''],
        establishment: ['',Validators.required],
        degree: ['',Validators.required],
        fromDate: ['',Validators.required],
        toDate: [''],
        resumeId: [this.resumeId,Validators.required],
      });
    });
  }

  submitEducation(){
    if(this.educationForm.valid){
      if(this.educationForm.value.id === ''){
        const education = this.educationForm.value as Education;
        this.store.dispatch(EducationActions.addEducation({education}));
      }else{
        const education = this.educationForm.value as Education;
        this.store.dispatch(EducationActions.updateEducation({education}));
      }
    }else{
      this.educationForm.markAllAsTouched();
    }
  }

  educationFormReset(){
    this.educationForm = this.formBuilder.group({
      id : [''],
      establishment: ['',Validators.required],
      degree: ['',Validators.required],
      fromDate: ['',Validators.required],
      toDate: [''],
      resumeId: [this.resumeId,Validators.required],
    });
  }

  deleteEducation(id: number){
    this.store.dispatch(EducationActions.deleteEducation({id}));
  }

  editEducation(education: Education){
    this.educationForm.patchValue({
      id: education.id,
      establishment: education.establishment,
      degree: education.degree,
      fromDate: education.fromDate ? formatDate(education.fromDate, 'yyyy-MM-dd', 'en-US') : null,
      toDate: education.toDate ? formatDate(education.toDate, 'yyyy-MM-dd', 'en-US')  : null,
      resumeId: this.resumeId,
    });
  }
}
