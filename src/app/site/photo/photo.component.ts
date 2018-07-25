import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'na-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  role: number = 0;
  polaroid;

  roles = [
    "Web-разработчик",
    "Учёный",
    "Дизайнер",
    "Художник"
  ];

  constructor(public common: CommonService, public router: Router) {}

  ngOnInit() {
    this.polaroid = $('.polaroid');

    this.common.roleChanged.subscribe(
      i => {
        this.touchPolaroid();
        this.role = i;
      }
    );
  }

  touchPolaroid() {
    this.polaroid.rotate({
      animateTo: (2 * Math.random() - 1) * 2.5,
      center: ["52%", "31px"],
      duration: 200
    });
  }

  changeRole() {
    // Перебираем все свойственные мне профессии
    if (this.role === this.roles.length - 1) {
      this.role = 0;
    } else {
      this.role++;
    }
  }

  goToIdeas() {
    const answer = prompt("Ghbdtn!");
    if (answer === "42") {
      this.router.navigate(['ideas']);
    }
  }
}
