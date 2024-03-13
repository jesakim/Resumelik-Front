import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Hobby } from 'src/app/store/models/hobby.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as HobbyActions from 'src/app/store/actions/hobby.actions';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  hobbies: Hobby[] = [];
  hobbyForm!: FormGroup;
  resumeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(switchActiveTab('Hobbies'));
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.hobbies = resume.hobbies;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.hobbyForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      resumeId: [this.resumeId, Validators.required]
    });
  }

  submitHobby(): void {
    if (this.hobbyForm.valid) {
      const hobby: Hobby = this.hobbyForm.value;
      if (!hobby.id) {
        this.store.dispatch(HobbyActions.addHobby({ hobby }));
      } else {
        this.store.dispatch(HobbyActions.updateHobby({ hobby }));
      }
    } else {
      this.hobbyForm.markAllAsTouched();
    }
  }

  hobbyFormReset(): void {
    this.initializeForm();
  }

  deleteHobby(id: number): void {
    this.store.dispatch(HobbyActions.deleteHobby({ id }));
  }

  editHobby(hobby: Hobby): void {
    this.hobbyForm.patchValue({
      id: hobby.id,
      name: hobby.name,
      resumeId: this.resumeId
    });
  }
}
