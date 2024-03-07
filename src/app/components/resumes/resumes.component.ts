import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadResumes } from 'src/app/store/actions/resume.actions';
import { Resume } from 'src/app/store/models/resume.model';
import { selectResumes } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent {

  resumes$! :Observable<Resume[]>;

  constructor(
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadResumes());
    this.resumes$ = this.store.pipe(select(selectResumes));
  }
}
