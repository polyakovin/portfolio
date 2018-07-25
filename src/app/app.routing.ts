import { IdeasComponent } from './ideas/ideas.component';
import { SiteComponent } from './site/site.component';
import { Routes, RouterModule } from "@angular/router";

const APP_ROUTES: Routes = [
  { path: '', component: SiteComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

// передаём пути на экспорт
export const routing = RouterModule.forRoot(APP_ROUTES);