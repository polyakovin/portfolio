import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import mentions from '../../../assets/data/mentions';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MentionsComponent implements OnInit {
  title = {
    ru: 'Упоминания',
    en: 'Mentions',
  };
  mentions = mentions;
  constructor (
    public common: CommonService,
  ) {}
  ngOnInit() {}
}
