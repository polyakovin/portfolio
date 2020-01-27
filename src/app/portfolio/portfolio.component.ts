import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  title = {'ru': 'Проекты', 'en': 'Projects'};
  // projects;
  openedProject;
  isModalShown = false;
  // @ViewChild('project') project;

  constructor(
    public common: CommonService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    console.log(this.common.projects);

    // this.setProjectSize();
    // $(document).ready(() => {
    //   this.projects = $('.projects-list .project');
    // })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = {
      escape: 27
    };

    switch (event.keyCode) {
      case key.escape:
        this.backToSite();
        break;
    }
  }

  // @HostListener('window:resize', ['$event'])
  // watchProjectSize(event: Event) {
  //   this.setProjectSize();
  // }

  // setProjectSize() {
  //   this.project.height(this.project.width() * .625);
  // }

  openModal(project) {
    this.cureVideoLink(project);
    this.openedProject = project;
    this.isModalShown = true;
  }

  cureVideoLink(project) {
    if (project.video) {
      project.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(project.video);
    }
  }

  backToSite() {
    this.router.navigate(['/']);
  }
}
