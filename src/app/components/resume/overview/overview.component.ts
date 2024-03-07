import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadResumeByName } from 'src/app/store/actions/resume.actions';
import { switchSideBar } from 'src/app/store/actions/side-bar.action';
import { Resume } from 'src/app/store/models/resume.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  slug!: string;
  resume$!: Observable<Resume>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(switchSideBar( 'Overview' ));
    this.route.parent!.params.subscribe(params => {
      this.slug = params['slug'];
    });

    this.store.dispatch(loadResumeByName({name:this.slug}))
    this.resume$ = this.store.pipe(select(selectResume));

  }



}
