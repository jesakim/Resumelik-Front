import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { deleteResume } from 'src/app/store/actions/resume.actions';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  SidebarItems = [
    {
      title: 'Overview',
      link: 'overview',
      icon: 'fa-home',
      active: false,
    },
    {
      title: 'Contacts',
      link: 'contacts',
      icon: 'fa-address-book',
      active: false,
    },
    {
      title: 'Addresses',
      link: 'addresses',
      icon: 'fa-location-dot',
      active: false,
    },
    {
      title: 'Experiences',
      link: 'experiences',
      icon: 'fa-briefcase',
      active: false,
    },
    {
      title: 'Educations',
      link: 'educations',
      icon: 'fa-graduation-cap',
      active: false,
    },
    {
      title: 'Skills',
      link: 'skills',
      icon: 'fa-cogs',
      active: false,
    },
    {
      title: 'Projects',
      link: 'projects',
      icon: 'fa-tasks',
      active: false,
    },
    {
      title: 'Certificates',
      link: 'certificates',
      icon: 'fa-certificate',
      active: false,
    },
    {
      title: 'Languages',
      link: 'languages',
      icon: 'fa-language',
      active: false,
    },
    {
      title: 'Hobbies',
      link: 'hobbies',
      icon: 'fa-medal',
      active: false,
    },
    {
      title: 'Statistics',
      link: 'statistics',
      icon: 'fa-chart-line',
      active: false,
    },
  ];

  slug?: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router:Router,
    ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });

    this.store.select(state => state.resumeState.selectedTab).subscribe((tab) => {
      this.setActiveTab(tab);
    });
  }

  pinSidenav(){
    document.querySelector('body')?.classList.toggle('g-sidenav-pinned')
  }

  setActiveTab(title:string){
    this.SidebarItems.forEach(item=>{
      if(item.title.toLowerCase() === title.toLowerCase()){
        item.active = true;
      }else{
        item.active = false;
      }
    })
  }

  deleteResume(){
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      console.log(resume);
      this.store.dispatch(deleteResume({id: resume.id}));
    });
    this.router.navigate(['/resumes']);
  }
}
