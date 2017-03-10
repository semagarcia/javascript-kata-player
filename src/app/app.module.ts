import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { CodemirrorModule } from 'ng2-codemirror';

import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { TimeElapsedPipe } from './individual/time.pipe';
import { ChallengeComponent } from './challenge/challenge.component';

import { LoginComponent } from './login/login.component';
import { CreateChallengeDialog } from './challenge/create-challenge.component';

import 'hammerjs';
import { StreamingComponent } from './streaming/streaming.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndividualComponent,
        TimeElapsedPipe,
        ChallengeComponent,
        LoginComponent,
        CreateChallengeDialog,
        StreamingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CodemirrorModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [],
    //exports: [CreateChallengeDialog],
    entryComponents: [CreateChallengeDialog],
    bootstrap: [AppComponent]
})
export class AppModule { }
