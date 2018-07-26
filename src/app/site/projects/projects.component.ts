import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  xps = [];
  selectedXP: any;
  videoUrl: any;
  projectsLimit = 3;
  isButtonShown = true;

  constructor(private http: HttpService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Наполнение портфолио работами
    this.http.get("assets/data/projects.json").subscribe(
      data => {
        this.xps = data;
        this.selectedXP = this.xps[0];
      },
      error => console.log(error)
    );
  }

  showAllProjects() {
    this.projectsLimit = this.xps.length;
    this.isButtonShown = false;
  }

  openModal(work) {
    this.selectedXP = work;

    // Разрешаем ангуляру пользоваться ссылкой на видео с видеохостинга
    if (this.selectedXP.video !== undefined) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedXP.video);
    }
  }
}