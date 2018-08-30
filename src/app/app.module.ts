import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { CommonService } from './common.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
mergeIcons();

import { SiteComponent } from './site/site.component';
import { SkillsComponent } from './site/skills/skills.component';
import { ProjectsComponent } from './site/projects/projects.component';
import { HobbiesComponent } from './site/hobbies/hobbies.component';
import { FooterComponent } from './site/footer/footer.component';
import { PhotoComponent } from './site/photo/photo.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FlagComponent } from './site/flag/flag.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    SkillsComponent,
    ProjectsComponent,
    HobbiesComponent,
    FooterComponent,
    PhotoComponent,
    PortfolioComponent,
    FlagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    FontAwesomeModule
  ],
  providers: [ HttpService, CommonService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

function mergeIcons() {
  let fa = {...fas, ...fab};
  for (const icon in fa) {
    fa[icon].prefix = 'fas';
  }
  library.add(fa);
}
