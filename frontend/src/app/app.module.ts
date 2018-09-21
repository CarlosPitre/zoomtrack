import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewsComponent } from './news/news.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';
import {RouterModule} from '@angular/router';
import {RouterConfig} from './route.config';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    MenuComponent,
    TagsComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(RouterConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
