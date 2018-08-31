import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
  selector: 'na-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  buttonText = {"ru": "Открыть список проектов", "en": "Open projects list"};
  currentWorkIndex = 0;
  slideDuration = 5000;
  divCV;
  worksView;
  landingImage;
  intervals = [];

  constructor(
    public common: CommonService,
    private appRef: ApplicationRef,
    private router: Router
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      this.divCV = $('.cv');
      this.worksView = $('.works-view');
      this.landingImage = this.worksView.find('.work')[0];

      this.setWorksViewScale();
      $(window).resize(() => {this.setWorksViewScale()});

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
  }

  setRandomWork() {
    const newWorkIndex = Math.round(Math.random()*(this.common.projectsForBanner.length - 1));
    if (this.currentWorkIndex !== newWorkIndex) {
      this.currentWorkIndex = newWorkIndex;
      this.appRef.tick();
    } else {
      this.setRandomWork();
    }
  }

  setNextProject() {
    this.currentWorkIndex = this.currentWorkIndex < this.common.projectsForBanner.length - 1 ? this.currentWorkIndex + 1 : 0;
    this.appRef.tick();
    setTimeout(() => {
      this.scrollTo(this.landingImage, this.slideDuration - 1000);
    }, 100);
  }

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

  showWorksList() {
    this.router.navigate(['portfolio']);
  }
}
