import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Skill } from 'src/app/store/models/skill.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as SkillActions from 'src/app/store/actions/skill.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillForm!: FormGroup;
  resumeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(switchActiveTab('Skills'));
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.skills = resume.skills;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.skillForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['OTHER', Validators.required],
      resumeId: [this.resumeId, Validators.required]
    });
  }

  submitSkill(): void {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;
      if (!skill.id) {
        this.store.dispatch(SkillActions.addSkill({ skill }));
      } else {
        this.store.dispatch(SkillActions.updateSkill({ skill }));
      }
    } else {
      this.skillForm.markAllAsTouched();
    }
  }

  skillFormReset(): void {
    this.initializeForm();
  }

  deleteSkill(id: number): void {
    this.store.dispatch(SkillActions.deleteSkill({ id }));
  }

  editSkill(skill: Skill): void {
    this.skillForm.patchValue({
      id: skill.id,
      name: skill.name,
      type: skill.type,
      resumeId: this.resumeId
    });
  }
}
