import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { Resume } from 'src/app/store/models/resume.model';
import * as resumeActions from 'src/app/store/actions/resume.actions';
@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css']
})
export class AddResumeComponent {

  addResumeForm!:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.addResumeForm = this.formBuilder.group({
      name: ['sv', [Validators.required]],
      firstName: ['svbdbrftnfgbc', Validators.required],
      lastName: ['svbdbrftnfgbc', Validators.required],
      picture: ['svbdbrftnfgbc', Validators.required],
      title: ['svbdbrftnfgbc', Validators.required],
    });
  }

  addResume() {
    if (this.addResumeForm.valid) {
      const formData = this.addResumeForm.value as Resume;
      this.store.dispatch(resumeActions.addResume({resume: formData}))
    }
  }



}
