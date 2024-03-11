import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Resume } from 'src/app/store/models/resume.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { Router } from '@angular/router';
import { updateResume,switchActiveTab } from 'src/app/store/actions/resume.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  editResumeForm!:FormGroup;
  resume!: Resume;
  editable = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ){}

  ngOnInit() {
    this.store.dispatch(switchActiveTab( 'Overview' ));
    
    this.editResumeForm = this.formBuilder.group({
      id: [{value:'',disabled:!this.editable},Validators.required],
      name: [{value:'',disabled:!this.editable},[Validators.required, Validators.minLength(3)]],
      firstName: [{value:'',disabled:!this.editable},Validators.required],
      lastName: [{value:'',disabled:!this.editable} , Validators.required],
      picture: [{value:'',disabled:!this.editable} , Validators.required],
      title: [{value:'',disabled:!this.editable} , Validators.required],
    });
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resume = resume;
      this.editResumeForm.patchValue(this.resume);
    });
  }

  toggleEditable() {
    this.editable = !this.editable;
    if (this.editable) {
      this.editResumeForm.enable();
    } else {
      this.editResumeForm.disable();
      this.editResumeForm.patchValue(this.resume);
    }
  }

  

  editResume() {
    if (this.editResumeForm.valid) {
      const formData = this.editResumeForm.value as Resume;
      this.store.dispatch(updateResume({resume: formData}))
      this.router.navigate(['/resumes', formData.name]);
      this.toggleEditable();
    }
  }



}
