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
  projects;
  openedProject;

  constructor(
    public common: CommonService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      this.projects = $('.projects-list .project');
      this.setHotkeys();
      this.watchProjectSize();
    })
  }

  setHotkeys() {
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
    this.cureVideoLink(project);
    this.openedProject = project;
  }

  cureVideoLink(project) {
    if (project.video) {
      project.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(project.video);
    }
  }

  watchProjectSize() {
    setProjectSize(this);
    $(window).resize(() => {setProjectSize(this)});

    function setProjectSize(that) {
      that.projects.height(that.projects.width()*.625);
    }
  }

  backToSite() {
    this.router.navigate(['/']);
  }
}