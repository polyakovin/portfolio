import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  buttonText = {
    ru: 'Открыть список проектов',
    en: 'Open projects list',
  };
  isScrolledDown = false;
  currentProjectIndex = 0;
  slideDuration = 5000;
  projectsViewHeight = '';
  projectsViewScale = '';

  constructor(
    public common: CommonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setProjectsViewScale();
    this.animateLanding();
    this.activateBanner();
  }

  onWindowResize(event) {
    this.setProjectsViewScale(event.target.innerWidth);
  }

  setProjectsViewScale(windowWidth = window.innerWidth) {
    const maxSmallWidth = 767;
    if (windowWidth > maxSmallWidth) {
      this.projectsViewHeight = '';
      this.projectsViewScale = '';
      return;
    }
    const initialWidth = 800;
    const initialHeight = 666;
    const cvPadding = 15;
    const scale = (windowWidth - cvPadding * 2) / initialWidth;
    this.projectsViewHeight = `${initialHeight * scale}px`;
    this.projectsViewScale = `scale(${scale})`;
  }

  animateLanding() {
    this.isScrolledDown = false;
    setTimeout(() => this.isScrolledDown = true, 100);
  }

  activateBanner() {
    setInterval(() => this.setNextProject(), this.slideDuration);
  }

  setNextProject() {
    this.currentProjectIndex = this.currentProjectIndex < this.common.projectsForBanner.length - 1 ? this.currentProjectIndex + 1 : 0;
    this.animateLanding();
  }

  setRandomProject() {
    const newProjectIndex = Math.round(Math.random() * (this.common.projectsForBanner.length - 1));
    if (this.currentProjectIndex !== newProjectIndex) {
      this.currentProjectIndex = newProjectIndex;
      this.animateLanding();
    } else {
      this.setRandomProject();
    }
  }

  showProjectsList() {
    this.router.navigate(['portfolio']);
  }
}
