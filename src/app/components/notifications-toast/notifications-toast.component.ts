import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { failureAction } from 'src/app/store/actions/failure.action';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-notifications-toast',
  templateUrl: './notifications-toast.component.html',
  styleUrls: ['./notifications-toast.component.css']
})
export class NotificationsToastComponent {
  // error$!: Observable<string>;
  // errorValidation$!: Observable<{ [key: string]: string }>;
  error!: string;
  errorValidation!: { [key: string]: string };
  isError: boolean = true;
  isShowed: boolean = false;
  timeout: any;

  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.store.select('failureState').subscribe((failureState) => {
      this.error = failureState.error;
      this.errorValidation = failureState.errorValidation;
      if (this.error) {
        this.show();
      }
    });
  }

  show() {
    if (!this.isShowed) {
      this.isShowed = true;
      this.timeout = setTimeout(() => {
        this.hide();
      }, 5000);
    }
  }

  

  hide() {
    this.isShowed = false;
    clearTimeout(this.timeout);
  }
}
