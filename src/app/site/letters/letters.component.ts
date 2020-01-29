import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {
  imgs = [];
  letters = [
    'smida',
    'emotionminer',
    'yandex'
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
  }
}
