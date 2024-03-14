import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { FullResume } from 'src/app/store/models/full-resume.model';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css']
})
export class ViewResumeComponent {
      resume!:FullResume;
      constructor(
        private resumeService:ResumeService,
        private route: ActivatedRoute,
      ){}

      ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.resumeService.getResumeByNamePublic(params['slug']).subscribe(resume => {
            this.resume = resume.result;
          });
        });
      }




}
