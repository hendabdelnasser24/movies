import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { loginGuard } from './login.guard';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { homeGuard } from './home.guard';
import { DetailsShowComponent } from './details-show/details-show.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [loginGuard] },
  { path: 'about', component: AboutComponent, canActivate: [loginGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [loginGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [loginGuard] },
  { path: 'tv-shows', component: TvShowsComponent, canActivate: [loginGuard] },
  { path: 'upcoming', component: UpcomingComponent, canActivate: [loginGuard] },
  { path: 'details-show/:media/:id', component: DetailsShowComponent, canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [homeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [homeGuard] },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  { path: '**', component: NotfoundComponent }
];
