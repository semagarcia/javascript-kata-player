import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { ChallengeComponent } from './challenge/challenge.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndividualComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
