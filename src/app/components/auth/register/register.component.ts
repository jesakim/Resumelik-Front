import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from 'src/app/store/actions/auth.actions';
import { User } from 'src/app/store/models/user.model';
import { selectIsAuthenticated } from 'src/app/store/selectors/auth.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../auth.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
    ){}

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      });
    }

    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const controlValue = formGroup.get(controlName)?.value;
        const matchingControlValue = formGroup.get(matchingControlName)?.value;
        
        if (controlValue !== matchingControlValue) {
          formGroup.get(matchingControlName)?.setErrors({ mustMatch: true });
        } else {
          formGroup.get(matchingControlName)?.setErrors(null);
        }
      }
    }

    submitRegister() {
      if (this.registerForm.valid) {
        // Implement your register logic here
        const user = this.registerForm.value as User;
        this.store.dispatch(register({ user }));
        this.store.select(selectIsAuthenticated).subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/resumes']);
          }
        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }

}
