import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Language } from 'src/app/store/models/language.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as LanguageActions from 'src/app/store/actions/language.actions';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  languages: Language[] = [];
  languageForm!: FormGroup;
  resumeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(switchActiveTab('Languages'));
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.languages = resume.languages;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.languageForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      level: ['1', Validators.required],
      resumeId: [this.resumeId, Validators.required]
    });
  }

  submitLanguage(): void {
    if (this.languageForm.valid) {
      const language: Language = this.languageForm.value;
      if (!language.id) {
        this.store.dispatch(LanguageActions.addLanguage({ language }));
      } else {
        this.store.dispatch(LanguageActions.updateLanguage({ language }));
      }
    } else {
      this.languageForm.markAllAsTouched();
    }
  }

  languageFormReset(): void {
    this.initializeForm();
  }

  deleteLanguage(id: number): void {
    this.store.dispatch(LanguageActions.deleteLanguage({ id }));
  }

  editLanguage(language: Language): void {
    this.languageForm.patchValue({
      id: language.id,
      name: language.name,
      level: language.level,
      resumeId: this.resumeId
    });
  }
}
