import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  title = {"ru": "Проекты", "en": "Projects"};
  openedProject;

  constructor(
    public common: CommonService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    $(document).keydown((event) => {
      const key = {
        escape: 27
      };

      switch (event.keyCode) {
        case key.escape:
          this.backToSite();
          break;
      }
    });
  }

  openModal(project) {
    // Разрешаем ангуляру пользоваться ссылкой на видео с видеохостинга
    if (project.video !== undefined) {
      project.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(project.video);
    }

    this.openedProject = project
  }

  setProjectSize() {
    const works = $('.works-list .work');
    works.height(works.width()*.625);
  }

  backToSite() {
    this.router.navigate(['/']);
  }
}
