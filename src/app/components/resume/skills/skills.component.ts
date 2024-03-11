import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(switchActiveTab( 'Skills' ));
  }

}
