import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent{
  
  slug?: string;

  
  
  constructor(
    private route: ActivatedRoute,
    ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });

  }

  pinSidenav(){
    document.querySelector('body')?.classList.toggle('g-sidenav-pinned')
  }
  
}
