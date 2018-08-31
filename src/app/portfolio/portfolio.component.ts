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
  videoUrl: any;

  constructor(
    public common: CommonService,
    private sanitizer: DomSanitizer,
    private router: Router
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
    this.openedProject = project;

    // Разрешаем ангуляру пользоваться ссылкой на видео с видеохостинга
    if (this.openedProject.video !== undefined) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.openedProject.video);
    }
  }

  setProjectSize() {
    const works = $('.works-list .work');
    works.height(works.width()*.625);
  }

  backToSite() {
    this.router.navigate(['/']);
  }
}
