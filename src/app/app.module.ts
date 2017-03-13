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
import { TimeElapsedPipe } from './individual/time.pipe';
import { ChallengeComponent } from './challenge/challenge.component';

import { LoginComponent } from './login/login.component';
import { StreamingComponent } from './streaming/streaming.component';
import { CreateChallengeDialog } from './dialogs/create-challenge/create-challenge.component';
import { OpenStreamingDialog } from './dialogs/open-streaming/open-streaming.component';
import { SettingsComponent } from './settings/settings.component';
import { RankingComponent } from './ranking/ranking.component';

import { ChallengeService, SocketService } from './core';

import { CodemirrorModule } from 'ng2-codemirror';
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndividualComponent,
        TimeElapsedPipe,
        ChallengeComponent,
        LoginComponent,
        StreamingComponent,
        CreateChallengeDialog,
        OpenStreamingDialog,
        SettingsComponent,
        RankingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CodemirrorModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        ChallengeService,
        SocketService
    ],
    entryComponents: [
        CreateChallengeDialog,
        OpenStreamingDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
