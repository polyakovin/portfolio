import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-mentoring',
  templateUrl: './mentoring.component.html',
  styleUrls: ['./mentoring.component.scss']
})
export class MentoringComponent implements OnInit {
  title = {
    ru: 'Менторство',
    en: 'Mentoring',
  };
  constructor (
    public common: CommonService,
  ) { }
  ngOnInit() {}
}
