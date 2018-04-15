import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { PreloaderComponent } from './preloader/preloader.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Animes Lista' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
