import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  title = {
    ru: 'Привет! Я Игорь.',
    en: 'Hi! I\'m Igor',
  };
  usp = {
    ru: `
      <p>
        Я разрабатываю приложения для веба и мобильных устройств и с удовольствием обучаю этому ремеслу всех желающих.
      </p>
      <p>
        Как можно увидеть из примеров моих работ, я действительно тащусь от визуализации и симуляции различных процессов.
      </p>
      <p>
        На этом сайте можно найти результаты проектов, над которыми я работал, отзывы моих клиентов, а также все мои публикации (включая образовательные материалы) и способы связаться со мной.
      </p>
    `,
    en: `
      <p>
        I develop apps for the web and mobile devices and am happy to help other people learn this skill too.
      </p>
      <p>
        As you can see from my work examples, I really get carried away with visualizing and simulating different processes.
      </p>
      <p>
        Here you can find the results of projects I have worked on, my clients' feedback, all my publications (including educational materials), and ways to contact me.
      </p>
    `,
  };

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
