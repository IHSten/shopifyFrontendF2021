import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NominationService } from './services/nomination.service';
import { NomineesComponent } from './nominees/nominees.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieDetailsComponent,
    NomineesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NominationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
