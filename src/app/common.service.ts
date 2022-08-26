import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import projects from '../assets/data/projects.json';

@Injectable()
export class CommonService {
  lang;
  selectedBest = false;
  projectsForBanner = [];
  projects = projects;

  constructor(
    private http: HttpService
  ) {
    this.getCountryCode();
    this.filterProjects();
  }

  getCountryCode() {
    if (!this.lang) {
      this.lang = 'en'; // ru, en
      this.http.get('https://ipapi.co/json').subscribe(
        res => this.lang = res.country_code.toLowerCase() === 'ru' ? 'ru' : 'en'
      );
    }
  }

  filterProjects() {
    const projectsEditable = [...this.projects];
    this.projects = [];
    this.projectsForBanner = [];
    for (const project of projectsEditable) {
      if (!project.ohNo && (!this.selectedBest || project.best)) {
        this.projects.push(project);

        if (project.forBanner) {
          this.projectsForBanner.push(project);
        }
      }
    }
  }

  toggleBest() {
    this.selectedBest = !this.selectedBest;
    this.filterProjects();
  }
}
