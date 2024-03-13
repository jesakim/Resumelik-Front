import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Project } from 'src/app/store/models/project.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as ProjectActions from 'src/app/store/actions/project.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  projectForm!: FormGroup;
  resumeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(switchActiveTab('Projects'));
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.projects = resume.projects;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.projectForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      title: ['', Validators.required],
      mode: ['OTHER', Validators.required],
      realisedAt: [''],
      description: [''],
      resumeId: [this.resumeId, Validators.required]
    });
  }

  submitProject(): void {
    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;
      if (!project.id) {
        this.store.dispatch(ProjectActions.addProject({ project }));
      } else {
        this.store.dispatch(ProjectActions.updateProject({ project }));
      }
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  projectFormReset(): void {
    this.initializeForm();
  }

  deleteProject(id: number): void {
    this.store.dispatch(ProjectActions.deleteProject({ id }));
  }

  editProject(project: Project): void {
    this.projectForm.patchValue({
      id: project.id,
      name: project.name,
      title: project.title,
      mode: project.mode,
      realisedAt: project.realisedAt ? formatDate(project.realisedAt, 'yyyy-MM-dd', 'en-US') : null,
      description: project.description,
      resumeId: this.resumeId
    });
  }
}
