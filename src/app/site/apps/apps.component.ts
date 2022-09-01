import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import apps from './apps';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  title = {
    ru: 'Мои приложения',
    en: 'My Apps',
  };
  apps = apps;
  constructor (
    public common: CommonService,
  ) {}
  ngOnInit() {}
}
