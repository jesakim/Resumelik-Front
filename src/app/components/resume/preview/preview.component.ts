import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadResumeByName } from 'src/app/store/actions/resume.actions';
import { FullResume } from 'src/app/store/models/full-resume.model';
import { Resume } from 'src/app/store/models/resume.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  resume!: FullResume;

  constructor(
    private store: Store<AppState>,
    private route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(loadResumeByName({name:params['slug']}));
    });
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resume = resume;
    });
  }

}
