import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-mentoring',
  templateUrl: './mentoring.component.html',
  styleUrls: ['./mentoring.component.scss']
})
export class MentoringComponent implements OnInit {
  title = {
    ru: 'Общественная деятельность & Менторство',
    en: 'Public Activity & Mentoring',
  };

  students = [
    {
      name: 'Алексей',
      photo: 'alexey',
      url: 'https://youtu.be/UyWWX-09za4',
    },
    {
      name: 'Андрей',
      photo: 'andrew1',
      url: 'https://youtu.be/KLJVG1k64s0',
    },
    {
      name: 'Андрей',
      photo: 'andrew2',
      url: 'https://youtu.be/9K9mp5jq_28',
    },
    {
      name: 'Дарья',
      photo: 'daria',
      url: 'https://youtu.be/arP_FG9KSPY',
    },
    {
      name: 'Екатерина',
      photo: 'ekaterina',
      url: 'https://youtu.be/CV_YfTZ07jw',
    },
    {
      name: 'Иван',
      photo: 'ivan',
      url: 'https://youtu.be/vB4BuIN-Ym8',
    },
    {
      name: 'Юрий',
      photo: 'yurii',
      url: 'https://youtu.be/G9LRoVROglY',
    },
    {
      name: 'Текстовые отзывы',
      photo: 'instagram',
      url: 'https://www.instagram.com/stories/highlights/17848032188446094/',
    },
  ];

  constructor (
    public common: CommonService,
  ) {}
  ngOnInit() {}
}
