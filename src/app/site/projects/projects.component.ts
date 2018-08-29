import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../http.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'na-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  xps = [];
  xpsFiltered = [];
  selectedXP: any;
  videoUrl: any;
  currentWorkIndex = 0;
  works = [];
  worksView;
  divCV;

  filter = {
    isShown: false,
    types: [
      {
        ru: "Всё",
        en: "all"
      },
      {
        ru: "Веб",
        en: "web"
      },
      {
        ru: "Графика",
        en: "graphics"
      },
      {
        ru: "Наука",
        en: "science"
      },
      {
        ru: "Остальное",
        en: "other"
      }
    ],
    selectedType: 'web',
    selectedBest: false && true
  };


  constructor(
    private http: HttpService,
    private sanitizer: DomSanitizer,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.http.get("assets/data/projects.json").subscribe(
      xps => {
        this.xps = xps;
        // console.log(xps);
        this.selectedXP = this.xps[0];
        this.filterWorks();
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
          left: 37,
          right: 39
        };

        switch (event.keyCode) {
          case key.left:
            this.prevWork();
            break;
          case key.right:
            this.nextWork();
            break;
        }
      });
    });

    setInterval(() => {
      this.setRandomWork();
    }, 3000);
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

  filterWorks() {
    const xpEditable = this.copyObject(this.xps);
    this.xpsFiltered = [];
    this.works = [];
    for (let xp of xpEditable) {
      const worksFiltered = [];
      for (let work of xp.works) {
        if ((!this.filter.selectedBest || work.best) &&
            (this.filter.selectedType === 'all' || this.filter.selectedType === work.type)) {
          worksFiltered.push(work);
          this.works.push(work);
        }
      }
      if (worksFiltered.length > 0) {
        xp.works = worksFiltered;
        this.xpsFiltered.push(xp);
      }
    }
  }

  openModal(work) {
    this.selectedXP = work;

    // Разрешаем ангуляру пользоваться ссылкой на видео с видеохостинга
    if (this.selectedXP.video !== undefined) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedXP.video);
    }
  }

  selectType(event, type) {
    event.preventDefault();
    this.filter.selectedType = type;
    this.filterWorks();
  }

  toggleBest() {
    // event.preventDefault();
    this.filter.selectedBest = !this.filter.selectedBest;
    this.filterWorks();
  }

  copyObject(object) { // https://scotch.io/bar-talk/copying-objects-in-javascript
    return JSON.parse(JSON.stringify(object));
  }

  showFilters() {
    this.filter.isShown = true;
  }

  prevWork() {
    this.currentWorkIndex = this.currentWorkIndex > 0 ? this.currentWorkIndex - 1 : this.currentWorkIndex;
    this.appRef.tick();
  }

  nextWork() {
    this.currentWorkIndex = this.currentWorkIndex < this.works.length - 1 ? this.currentWorkIndex + 1 : this.currentWorkIndex;
    this.appRef.tick();
  }

  setRandomWork() {
    const newWorkIndex = Math.round(Math.random()*(this.works.length - 1));
    if (this.currentWorkIndex !== newWorkIndex) {
      this.currentWorkIndex = newWorkIndex;
      this.appRef.tick();
    } else {
      this.setRandomWork();
    }
  }
}
