import { Component, OnInit } from '@angular/core';
import links from '../../../assets/data/links.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  links = links;
  constructor() {}
  ngOnInit() {}
}
