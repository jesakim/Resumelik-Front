import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchSideBar } from 'src/app/store/actions/side-bar.action';

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
    private store: Store<any>,
    ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });

    this.store.select('sideBarState').subscribe((tab) => {
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
}
