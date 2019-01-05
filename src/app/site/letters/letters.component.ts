import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {
  imgs = [];
  letters = [
    'smida',
    'emotionminer'
  ];
  activeLetter = -1;

  constructor() { }

  ngOnInit() {
  }

  showPicture(i) {
    if (this.activeLetter === i) {
      this.activeLetter = -1;
    } else {
      this.activeLetter = i;
    }
    // console.log(i);

    // if (this.imgs.length === 0) {
    //   this.imgs = event.path[1].querySelector('img');
    // }
    // console.log(this.imgs);
    // for ()
    // event.target.classList.add('active');
  }
}
