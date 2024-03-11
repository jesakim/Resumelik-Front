import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadResumeByName } from 'src/app/store/actions/resume.actions';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent{
  
  slug!: string;

  
  
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
    this.store.dispatch(loadResumeByName({name:this.slug}));
  }

  pinSidenav(){
    document.querySelector('body')?.classList.toggle('g-sidenav-pinned')
  }
  
}
