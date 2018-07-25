import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from './http.service';
import { CommonService } from './common.service';

import { SiteComponent } from './site/site.component';
import { HeaderComponent } from './site/header/header.component';
import { SkillsComponent } from './site/skills/skills.component';
import { ProjectsComponent } from './site/projects/projects.component';
import { HobbiesComponent } from './site/hobbies/hobbies.component';
import { EducationComponent } from './site/education/education.component';
import { FooterComponent } from './site/footer/footer.component';
import { PrideComponent } from './site/pride/pride.component';
import { PhotoComponent } from './site/photo/photo.component';

import { IdeasComponent } from './ideas/ideas.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    HeaderComponent,
    SkillsComponent,
    ProjectsComponent,
    HobbiesComponent,
    EducationComponent,
    FooterComponent,
    PrideComponent,
    PhotoComponent,
    IdeasComponent
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
