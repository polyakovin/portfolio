import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  title = {
    ru: 'Сайт Игоря Полякова',
    en: 'Igor Polyakov\'s website',
  };
  contacts = {
    ru: 'Контакты',
    en: 'Contacts',
  };
  usp = {
    ru: `
      <p>
        Здесь просто собрано то, чем я горжусь, и что люблю (в основном, изобретать велосипеды и повышать эффективность айтишников).
      </p>
    `,
    en: `
      <p>
        It just contains what I'm proud of and what I love (basically, reinventing bicycles and improving the efficiency of IT specialists).
      </p>
    `,
  };

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
