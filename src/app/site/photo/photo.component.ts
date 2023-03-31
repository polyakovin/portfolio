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
        Это небольшой портал, на котором можно найти
        <ul>
          <li>мои <a href="https://humorous-myrtle-078.notion.site/b4761a0713ff40cc98f842fe502c8145?v=fff551ba13a64bd8803bca5a376eb090" target="_blank">публикации</a>,</li>
          <li>проекты, над которыми я трудился,</li>
          <li>и <a href="#contacts">контакты</a> для связи со мной.</li>
        </ul>
      </p>
      <p>
        А вот ещё и <a href="https://humorous-myrtle-078.notion.site/e62ff7b80e3d4fec85cde132852386ae?v=fc6a00ebe8fc4c318a4f94b1959fe03f" target="_blank">страничка с упоминаниями</a> обо мне,<br> моих коллегах и наших совместных проектах.
      </p>
    `,
    en: `
      <p>
        This is a small portal where you can find
        <ul>
          <li>my <a href="https://humorous-myrtle-078.notion.site/b4761a0713ff40cc98f842fe502c8145?v=fff551ba13a64bd8803bca5a376eb090" target="_blank">publications</a>,</li>
          <li>the projects I worked on,</li>
          <li>and <a href="#contacts">contacts</a> to reach me out.</li>
        </ul>
      </p>
      <p>
        And here is <a href="https://humorous-myrtle-078.notion.site/e62ff7b80e3d4fec85cde132852386ae ?v=fc6a00ebe8fc4c318a4f94b1959fe03f " target="_blank">a page with mentions</a> about me,<br> my colleagues and our joint projects.
      </p>
    `,
  };

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
