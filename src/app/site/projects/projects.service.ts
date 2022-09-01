import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';
import projects from './projects';

@Injectable()
export class ProjectsService {
  selectedBest = false;
  projectsForBanner = [];
  projects = projects;

  constructor(
    private http: HttpService
  ) {
    this.filterProjects();
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
