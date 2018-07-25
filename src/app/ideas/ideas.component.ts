import { HttpService } from '../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  ideaContent: any = "";
  selectedIdea: string = " ";
  ideas: any = {};
  i: any;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("assets/data/ideas.json").subscribe(
      data => this.ideas = data,
      error => console.log(error)
    );

    this.i = document.getElementById("idea");
  }

  showIdea(event, idea) {
    event.preventDefault();

    if (this.selectedIdea !== idea.title) {
      // Загружаем файл идеи с разметкой Markdown
      this.http.getMarkdown("assets/data/ideas/" + idea.md + ".md").subscribe(
        html => {
          this.ideaContent = `<h2>${idea.title}</h2>` + html; // вставляем содержание идеи
          this.i.scrollIntoView(); // переходим к содержанию идеи
          this.selectedIdea = idea.title;
        },
        error => console.log(error)
      );
    }
  }
}
