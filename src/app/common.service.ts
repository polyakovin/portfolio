import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CommonService {
  lang;
  selectedBest = false;
  projectsForBanner = [];
  projects = [];
  skills = [];
  hobbies = [];
  links = [];

  constructor(
    private http: HttpService
  ) {
    this.getCountryCode();
    this.getProjects();
  }

  getCountryCode() {
    if (!this.lang) {
      this.lang = "ru"; // ru, en
      this.http.get("http://ip-api.com/json").subscribe(
        res => this.lang = res.countryCode.toLowerCase() === 'ru' ? 'ru' : 'en',
        () => this.lang = "ru"
      );
    }
  }

  getProjects() {
    this.http.get("assets/data/projects.json").subscribe(
      projects => {
        this.projects = projects;
        this.filterProjects();
      },
      error => console.error(error)
    );
  }

  filterProjects() {
    const projectsEditable = this.copyObject(this.projects);
    this.projects = [];
    this.projectsForBanner = [];
    for (let project of projectsEditable) {
      if (!project.ohNo && (!this.selectedBest || project.best)) {
        this.projects.push(project);

        if (project.forBanner) {
          this.projectsForBanner.push(project);
        }
      }
    }
  }

  copyObject(object) { // https://scotch.io/bar-talk/copying-objects-in-javascript
    return JSON.parse(JSON.stringify(object));
  }

  toggleBest() {
    this.selectedBest = !this.selectedBest;
    this.filterProjects();
  }
}
