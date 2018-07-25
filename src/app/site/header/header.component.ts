import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'na-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navItems = [
    {
      id: "projects",
      title: "Проекты"
    },
    {
      id: "skills",
      title: "Любимые инструменты"
    },
    {
      id: "hobbies",
      title: "Увлечения"
    },
    {
      id: "contacts",
      title: "Контакты"
    }
  ];

  activeLink = "";

  constructor() { }

  ngOnInit() {
    var that = this;
    $(window).scroll(function(){
      that.activeLink = $('.nav-link.active').html();
    });
  }

}
