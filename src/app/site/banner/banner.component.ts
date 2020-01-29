import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

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
  @ViewChild('projectsViewElement') projectsViewElement;
  @ViewChild('projectElement') projectElement;
  @ViewChild('projectImgElement') projectImgElement;
  projectsView;
  landingImage;
  projectImg;

  currentProjectIndex = 0;
  slideDuration = 5000;
  animationDuration = 4000;
  intervals = [];
  increment = 10;
  endPosition;

  constructor(
    public common: CommonService,
    private appRef: ApplicationRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.setHTMLElements();
    this.setProjectsViewScale();
    this.animateLanding();
    this.activateBanner();
  }

  onWindowResize(event) {
    this.setProjectsViewScale(event.target.innerWidth);
  }

  setHTMLElements() {
    this.projectsView = this.projectsViewElement.nativeElement;
    this.landingImage = this.projectElement.nativeElement;
    this.projectImg = this.projectImgElement.nativeElement;
  }

  setProjectsViewScale(windowWidth = window.innerWidth) {
    const maxSmallWidth = 767;
    if (windowWidth > maxSmallWidth) {
      this.projectsView.style = {};
      return;
    }
    const initialWidth = 800;
    const initialHeight = 666;
    const cvPadding = 15;
    const scale = (windowWidth - cvPadding * 2) / initialWidth;
    this.projectsView.style.height = `${initialHeight * scale}px`;
    this.projectsView.style.transform = `scale(${scale})`;
  }

  animateLanding() {
    setTimeout(() => this.scrollTo(), 100);
  }

  activateBanner() {
    setInterval(() => this.setNextProject(), this.slideDuration);
  }

  scrollTo() {
    const containerHeight = this.landingImage.offsetHeight;
    const contentHeight = this.projectImg.offsetHeight;
    this.endPosition = contentHeight - containerHeight;

    this.showLandingTop();
    this.clearOldIntervals();
    this.animateScroll();
  }

  showLandingTop() {
    this.landingImage.scrollTop = 0;
  }

  clearOldIntervals() {
    for (const interval of this.intervals) {
      if (interval) {
        clearInterval(interval);
      }
    }
    this.intervals = [];
  }

  animateScroll(currentTime = 0) {
    currentTime += this.increment;
    this.landingImage.scrollTop = this.easeInOutQuad(currentTime);
    if (currentTime < this.animationDuration) {
      this.intervals.push(setTimeout(this.animateScroll.bind(this, currentTime), this.increment));
    }
  }

  easeInOutQuad(t) {
    t /= this.animationDuration / 2;
    if (t < 1) {
      return this.endPosition / 2 * t * t;
    }
    t--;
    return -this.endPosition / 2 * (t * (t - 2) - 1);
  }

  setNextProject() {
    this.currentProjectIndex = this.currentProjectIndex < this.common.projectsForBanner.length - 1 ? this.currentProjectIndex + 1 : 0;
    this.appRef.tick();
    this.animateLanding();
  }

  setRandomProject() {
    const newProjectIndex = Math.round(Math.random() * (this.common.projectsForBanner.length - 1));
    if (this.currentProjectIndex !== newProjectIndex) {
      this.currentProjectIndex = newProjectIndex;
      this.appRef.tick();
      this.animateLanding();
    } else {
      this.setRandomProject();
    }
  }

  showProjectsList() {
    this.router.navigate(['portfolio']);
  }
}
