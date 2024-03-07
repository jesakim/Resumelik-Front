import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchSideBar } from 'src/app/store/actions/side-bar.action';
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
    this.store.dispatch(switchSideBar( 'Skills' ));
  }

}
