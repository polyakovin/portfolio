import { Component, OnInit } from '@angular/core';
import { shuffle } from 'lodash';
import { CommonService } from '../../common.service';
import blogs from '../../../assets/data/blogs.json';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  title = {
    ru: 'Блог-площадки',
    en: 'Blog topics',
  };
  blogs = shuffle(blogs);
  constructor(
    public common: CommonService,
  ) {}
  ngOnInit() {}
}
