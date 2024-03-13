import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/auth.actions';
import { User } from 'src/app/store/models/user.model';
import { selectIsAuthenticated } from 'src/app/store/selectors/auth.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../auth.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
    ){}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }

    submitLogin() {
      if (this.loginForm.valid) {
        const user = this.loginForm.value as User;
        this.store.dispatch(login({ user }));
        this.store.select(selectIsAuthenticated).subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/resumes']);
          }
        });
      } else {
        this.loginForm.markAllAsTouched();
      }
    }

}
