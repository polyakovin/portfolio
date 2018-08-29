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
  worksListShown = false;
  selectedBest = false;
  divCV;
  worksView;
  landingImage;
  slideDuration = 5000;

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
      error => console.error(error)
    );

    $(document).ready(() => {
      this.divCV = $('.cv');
      this.worksView = $('.works-view');
      this.landingImage = this.worksView.find('.work')[0];

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

      setTimeout(() => {
        this.scrollTo(this.landingImage, this.slideDuration - 1000);
      }, 100);
    });

    setInterval(() => {
      this.setNextProject();
    }, this.slideDuration);
  }

  setWorksViewScale() {
    let scale = 1;
    const initialWidth = 800;
    const initialHeight = 666;
    const cvWidth = this.divCV.width();
    const windowWidth = $(window).width();

    if (windowWidth > 1199) {
      scale = 1;
    } else if (windowWidth > 991) {
      scale = 0.8;
    } else {
      scale = cvWidth/initialWidth;
    }

    this.worksView.height(initialHeight*scale);
    this.worksView.css({transform: `scale(${scale})`});

    const works = $('.works-list .work');
    works.height(works.width()*.625);
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
    this.appRef.tick();
    setTimeout(() => {
      this.scrollTo(this.landingImage, this.slideDuration - 1000);
    }, 100);
  }

  showWorksList() {
    this.worksListShown = true;
    this.disableScroll();
    setTimeout(() => {
      this.setWorksViewScale();
    }, 100);
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

  intervals = [];
  scrollTo(element, duration) {
    element.scrollTop = 0;
    const landingImage = $(element);
    const containerHeight = landingImage.height();
    const contentHeight = landingImage.find('img').height();
    const endPosition = contentHeight - containerHeight;
    const startPosition = 0;
    const change = endPosition - startPosition;
    let currentTime = 0;
    const increment = 10;

    let intervals = this.intervals;
    for (let interval of intervals) {
      if (interval) clearInterval(interval);
    }
    this.intervals = intervals = [];
    animateScroll();

    function animateScroll() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, startPosition, change, duration);
      element.scrollTop = val;

      if (currentTime < duration) {
        intervals.push(setTimeout(animateScroll, increment));
      }
    };

    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }
  }
}
