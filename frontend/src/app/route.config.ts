/**
 * Created by CarlosPitre on 19/09/18.
 */
import {Route} from '@angular/router';
import {NewsComponent} from './news/news.component';
import {TagsComponent} from './tags/tags.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';

export const RouterConfig: Route[] = [
  {
    path : 'news',
    component : NewsComponent
  },
  {
    path : 'tags',
    component : TagsComponent
  },
  {
    path : 'users',
    component : UsersComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'news',
    redirectTo : 'news',
    pathMatch : 'full'
  },
  {
    path : '**',
    redirectTo : 'news'
  },
]
