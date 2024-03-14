import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/store/actions/auth.actions';
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

  resumes!: Resume[];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadResumes());
    this.store.pipe(select(selectResumes)).subscribe(resumes => {
      this.resumes = resumes;      
    });
  }

  logout(){
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }
}
