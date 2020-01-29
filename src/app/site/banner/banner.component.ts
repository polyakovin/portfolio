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
  projectsView;
  landingImage;

  currentProjectIndex = 0;
  slideDuration = 5000;
  intervals = [];

  constructor(
    public common: CommonService,
    private appRef: ApplicationRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.setHTMLElements();
    this.setProjectsViewScale();
    // $(document).ready(() => {
      // this.animateLanding();
      // this.activateBanner();
    // });
  }

  onWindowResize(event) {
    this.setProjectsViewScale(event.target.innerWidth);
  }

  setHTMLElements() {
    this.projectsView = this.projectsViewElement.nativeElement;
    this.landingImage = this.projectElement.nativeElement;
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
    setTimeout(() => {
      this.scrollTo(this.landingImage, this.slideDuration - 1000);
    }, 100);
  }

  activateBanner() {
    setInterval(() => {
      this.setNextProject();
    }, this.slideDuration);
  }

  scrollTo(element, duration) {
    // const landingImage = $(element);
    // const containerHeight = landingImage.height();
    // const contentHeight = landingImage.find('img').height();
    // const endPosition = contentHeight - containerHeight;
    // const startPosition = 0;
    // const change = endPosition - startPosition;
    // const increment = 10;
    // let currentTime = 0;
    // let intervals = this.intervals;

    // showLandingTop();
    // clearOldIntervals(this);
    // animateScroll();

    // function showLandingTop() {
    //   element.scrollTop = 0;
    // }

    // function clearOldIntervals(that) {
    //   for (const interval of intervals) {
    //     if (interval) {
    //       clearInterval(interval);
    //     }
    //   }
    //   that.intervals = intervals = [];
    // }

    // function animateScroll() {
    //   currentTime += increment;
    //   element.scrollTop = easeInOutQuad(currentTime, startPosition, change, duration);
    //   if (currentTime < duration) {
    //     intervals.push(setTimeout(animateScroll, increment));
    //   }
    // }

    // function easeInOutQuad(t, b, c, d) {
    //   t /= d / 2;
    //   if (t < 1) {
    //     return c / 2 * t * t + b;
    //   }
    //   t--;
    //   return -c / 2 * (t * (t - 2) - 1) + b;
    // }
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
