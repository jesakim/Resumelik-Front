import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/states/app.state';
import { failureAction } from './store/actions/failure.action';
import { loadToken } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resumlik-Front';
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadToken());
  }
}
