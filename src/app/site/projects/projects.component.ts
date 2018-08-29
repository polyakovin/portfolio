import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../http.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'na-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [];
  projectsForBanner = [];
  openedProject;
  videoUrl: any;
  currentWorkIndex = 0;
  worksView;
  worksListShown = false;
  divCV;
  selectedBest = false;

  constructor(
    private http: HttpService,
    private sanitizer: DomSanitizer,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.http.get("assets/data/projects.json").subscribe(
      projects => {
        this.projects = projects;
        this.filterProjects();
      },
      error => console.log(error)
    );

    $(document).ready(() => {
      this.worksView = $('.works-view');
      this.divCV = $('.cv');

      this.setWorksViewScale();
      $(window).resize(() => {this.setWorksViewScale()});

      $(document).keydown((event) => {
        const key = {
          escape: 27
        };

        switch (event.keyCode) {
          case key.escape:
            this.closeWorksList();
            break;
        }
      });
    });

    setInterval(() => {
      this.setNextProject();
    }, 5000);
  }

  setWorksViewScale() {
    let scale = 1;
    const initialWidth = 800;
    const initialHeight = 666;
    const cvWidth = this.divCV.width();
    const windowWidth = $(window).width();
    console.log(windowWidth);
    if (windowWidth > 1199) {
      scale = 1;
    } else if (windowWidth > 991) {
      scale = 0.87;
    } else {
      scale = cvWidth/initialWidth;
    }

    this.worksView.height(initialHeight*scale);
    this.worksView.css({transform: `scale(${scale})`});
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

  openModal(project) {
    this.openedProject = project;

    // Разрешаем ангуляру пользоваться ссылкой на видео с видеохостинга
    if (this.openedProject.video !== undefined) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.openedProject.video);
    }
  }

  toggleBest() {
    this.selectedBest = !this.selectedBest;
    this.filterProjects();
  }

  copyObject(object) { // https://scotch.io/bar-talk/copying-objects-in-javascript
    return JSON.parse(JSON.stringify(object));
  }

  setRandomWork() {
    const newWorkIndex = Math.round(Math.random()*(this.projectsForBanner.length - 1));
    if (this.currentWorkIndex !== newWorkIndex) {
      this.currentWorkIndex = newWorkIndex;
      this.appRef.tick();
    } else {
      this.setRandomWork();
    }
  }

  setNextProject() {
    this.currentWorkIndex = this.currentWorkIndex < this.projectsForBanner.length - 1 ? this.currentWorkIndex + 1 : 0;
  }

  showWorksList() {
    this.worksListShown = true;
    this.disableScroll();
  }

  closeWorksList() {
    this.worksListShown = false;
    this.enableScroll();
  }

  disableScroll() {
    $("body").addClass("modal-open");
  }

  enableScroll() {
    $("body").removeClass("modal-open");
  }
}
