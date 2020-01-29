import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';

const APP_ROUTES: Routes = [
  { path: '', component: SiteComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
