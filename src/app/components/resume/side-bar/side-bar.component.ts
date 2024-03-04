import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

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
      active: true,
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
      icon: 'fa-briefcase'
    },
    {
      title: 'Educations',
      link: 'educations',
      icon: 'fa-graduation-cap'
    },
    {
      title: 'Skills',
      link: 'skills',
      icon: 'fa-cogs'
    },
    {
      title: 'Projects',
      link: 'projects',
      icon: 'fa-tasks'
    },
    {
      title: 'Certificates',
      link: 'certificates',
      icon: 'fa-certificate'
    },
    {
      title: 'Languages',
      link: 'languages',
      icon: 'fa-language'
    },
    {
      title: 'Hobbies',
      link: 'hobbies',
      icon: 'fa-medal'
    },
    {
      title: 'Statistics',
      link: 'statistics',
      icon: 'fa-chart-line'
    },
  ];

  slug?: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }

  pinSidenav(){
    document.querySelector('body')?.classList.toggle('g-sidenav-pinned')
  }

  setActiveTab(title:string){
    this.SidebarItems.forEach(item=>{
      if(item.title === title){
        item.active = true;
      }else{
        item.active = false;
      }
    })
  }
}
