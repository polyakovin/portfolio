import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../http.service';
import { Component, OnInit } from '@angular/core';

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
    selectedBest: true
  };


  constructor(private http: HttpService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Наполнение портфолио работами
    this.http.get("assets/data/projects.json").subscribe(
      xps => {
        this.xps = xps;
        // console.log(xps);
        this.selectedXP = this.xps[0];
        this.filterWorks();
      },
      error => console.log(error)
    );
  }

  filterWorks() {
    const xpEditable = this.copyObject(this.xps);
    this.xpsFiltered = [];
    for (let xp of xpEditable) {
      const worksFiltered = [];
      for (let work of xp.works) {
        if ((!this.filter.selectedBest || work.best) &&
            (this.filter.selectedType === 'all' || this.filter.selectedType === work.type)) {
          worksFiltered.push(work);
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
}
