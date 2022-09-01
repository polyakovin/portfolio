import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { ProjectsService } from './projects.service';

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
    public projectsService: ProjectsService,
  ) {}

  ngOnInit() {}
}
