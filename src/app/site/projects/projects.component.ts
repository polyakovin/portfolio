import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  title = {
    ru: 'Проекты',
    en: 'Projects',
  };

  constructor (
    public common: CommonService,
  ) {}

  ngOnInit() {}
}
